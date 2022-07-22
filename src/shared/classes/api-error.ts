import { HttpStatusCode } from '../types/http-statuscode.model';
import { BaseError } from './base-error';

export class APIError extends BaseError {
    constructor(message: string, methodName = '', httpCode: number, isOperational = true) {
        super('', message, methodName, httpCode, isOperational);
    }
}