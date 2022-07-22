import { unlink } from "node:fs";
import { NextFunction, Request, Response } from 'express';
import multer, { MulterError } from 'multer';
import { validate } from "class-validator";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { User } from '../entity/User';
import { AppDataSource } from '../data-source';
import { APIError } from '../shared/classes/api-error';
import { Success } from '../shared/classes/success';
import { Jwt } from "../utils/jwt";

const userRepository = AppDataSource.getRepository(User);


export class UserController {
    public async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // console.log(req.body);
            // console.log(req.files);

            const { firstName, lastName, username, dob, mobile_number, email, password } = req.body;
            const files: any = req.files as Express.Multer.File[];

            // const image = req.files && files.image ? files.image : null;
            const user = new User();
            user.firstName = firstName;
            user.lastName = lastName;
            user.username = username;
            user.mobile_number = mobile_number;
            user.email = email;
            user.dob = dob;
            user.password = password;
            console.log(files.image[0].path);


            if (files) {
                user.image = files.image[0].path;
            }

            const errors = await validate(user);
            if (errors.length > 0) {
                return next(errors);
            }
            const userSave = await userRepository.save(user);

            new Success(req, res, 201).dataSaveSuccessfully(userSave);
        } catch (err) {
            console.error('err', err);

            err instanceof APIError ? next(new APIError(err.message, 'Post', 500)) : next(err);
        }
    }

    public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { username, mobile_number, email, password } = req.body;
            console.log(username, mobile_number, email, password);

            const user = await userRepository.findOne({
                where: [
                    { username: username },
                    { mobile_number: mobile_number },
                    { email: email },
                ]
            });

            if (!user) {
                return next(new APIError('User not found', 'Post', 404));
            }

            const isValid = await compare(password, user.password);

            if (!isValid) {
                return next(new APIError('Invalid password', 'Post', 401));
            }

            const accessToken = await Jwt.signAccessToken({ id: user.id, username: user.username, email: user.email });
            const refreshToken = await Jwt.signRefreshToken({ id: user.id, username: user.username, email: user.email });

            res.cookie('token', refreshToken, {
                httpOnly: true,
                secure: true,
                maxAge: 1000 * 60 * 60 * 24 * 30  // 30 days
            });

            new Success(req, res, 200).dataSaveSuccessfully({
                accessToken: accessToken
            });

        } catch (err) {
            err instanceof APIError ? next(new APIError(err.message, 'Post', 500)) : next(err);
        }
    }
}

export const userController = new UserController();