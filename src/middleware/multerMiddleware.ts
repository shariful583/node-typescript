import { Request, Response, NextFunction } from "express";
import multer, { MulterError } from "multer";

class MulterMidleware {
    constructor() { }

    public uploadMiddileware(path: string = '') {
        if (path === '') {
            return multer();
        }
        return multer({
            storage: multer.diskStorage({
                destination: function (req, file, cb) {
                    cb(null, path);
                },
                filename: function (req, file, cb) {
                    const fileExt = file.originalname.split(".").pop();
                    const fileName = `${file.originalname}-${Date.now()}.${fileExt}`;
                    cb(null, fileName);
                }
            }),
        });

    }
}

export default new MulterMidleware()
