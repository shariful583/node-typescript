import { Request, Response } from 'express';
import { HttpStatusCode } from '../types/http-statuscode.model';

export class Success {
    private httpVersion: string;
    private httpStatusCode: number;
    private req: Request;
    private res: Response;

    constructor(req: Request, res: Response, statusCode: number) {
        this.httpVersion = req.httpVersion;
        this.httpStatusCode = statusCode;
        this.req = req;
        this.res = res;
    }

    public dataSaveSuccessfully(data: any): void {
        this.res.status(this.httpStatusCode).json({
            "message": "Data saved successfully",
            "statusCode": this.httpStatusCode,
            "data": data
        })
    }
}