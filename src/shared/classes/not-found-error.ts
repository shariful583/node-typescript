import { BaseError } from './base-error';
import { HttpStatusCode } from '../types/http-statuscode.model';

export class NotFoundError extends BaseError {
    constructor(message: string, methodName = '', httpCode = HttpStatusCode.NOT_FOUND, isOperational = true) {
        super('', message, methodName, httpCode, isOperational);
    }
}