import { unlink } from "node:fs";
import { NextFunction, Request, Response } from "express";

export const errorMiddleware = (error: any, req: Request, res: Response, next: NextFunction) => {
    const allFiles = req.files as any;

    if (allFiles) {
        Object.keys(allFiles).forEach(async (file: any) => {
            allFiles[file].forEach(async (file: any) => {
                unlink(file.path, (err: any) => {
                    if (err) {
                        console.error(err);
                    }
                }
                );
            })
        });
    }

    const customError: boolean = error.constructor.name === 'NodeError' || error.constructor.name === 'SyntaxError' ? false : true;
    const statusCode: number = error.constructor.name === 'Array' ? 400 : error.statusCode || 500;

    res.status(statusCode).json({
        error: {
            type: customError === false ? 'UnhandledError' : error.constructor.name,
            path: req.path,
            statusCode: statusCode,
            message: error.constructor.name === 'Array' ? error : error.message
        }
    });
    next(error);
};