import { readFileSync } from "node:fs";
import { sign, verify } from "jsonwebtoken";
import { NextFunction } from "express";

export class Jwt {
    private static accessTokenPrivateKey = readFileSync(`${__dirname}/../../jwtRS256.key`, 'utf8');
    private static refreshTokenPrivateKey = readFileSync(`${__dirname}/../../refresh-token.key`, 'utf8');

    private static signInOptions: any = {
        algorithm: 'RS256',
        expiresIn: "1d",
        issuer: 'localhost',
        subject: 'subject',
        audience: 'localhost'
    };

    private static verifyOptions: any = {
        algorithms: 'RS256',
        expiresIn: "30d",
        issuer: 'localhost',
        subject: 'subject',
        audience: 'localhost'
    };

    constructor() { }

    public static async signAccessToken(payload: any): Promise<string> {
        return await sign(payload, this.accessTokenPrivateKey, this.signInOptions);
    }

    public static async signRefreshToken(payload: any): Promise<string> {
        return await sign(payload, this.refreshTokenPrivateKey, this.signInOptions);
    }

    public static async verifyAccessToken(req: any, res: any, next: NextFunction): Promise<any> {
        try {
            const verifyOptions: any = {
                algorithms: 'RS256',
                expiresIn: "30d",
                issuer: 'localhost',
                subject: 'subject',
                audience: 'localhost'
            };
            const accessTokenCert = readFileSync(`${__dirname}/../../jwtRS256.key.pub.pem`, 'utf8');
            const token = req.headers.authorization.split(' ')[1];

            const decoded = await verify(token, accessTokenCert, verifyOptions);

            if (decoded) {
                req.user = decoded;
                next();
            }
        } catch (error) {
            next(error);
        }

    }

    public static async verifyRefreshToken(req: any, res: any, next: NextFunction): Promise<any> {
        try {
            const verifyOptions: any = {
                algorithms: 'RS256',
                expiresIn: "30d",
                issuer: 'localhost',
                subject: 'subject',
                audience: 'localhost'
            };
            const refreshTokenCert = readFileSync(`${__dirname}/../../refresh-token.key.pub.pem`, 'utf8');
            const token = req.headers.authorization.split(' ')[1];

            const decoded = await verify(token, refreshTokenCert, verifyOptions);

            if (decoded) {
                console.log(decoded);

                return true;
            }
        } catch (error) {
            console.log(error);
            next(error);
        }

    }
}
