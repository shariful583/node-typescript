import {
    ValidatorConstraint, ValidatorConstraintInterface,
    ValidationArguments
} from "class-validator";
import { User } from '../entity/User';
import { AppDataSource } from '../data-source';
const userRepository = AppDataSource.getRepository(User);

@ValidatorConstraint({ name: "customText", async: true })
export class CustomEmail implements ValidatorConstraintInterface {

    constructor() { }
    async validate(email: string, args: ValidationArguments) {

        const user = await userRepository.find({
            where: {
                email: email
            }
        });
        return !user;
    }

    defaultMessage(args: ValidationArguments) {
        return "Text ($value) is too short or too long!";
    }
}