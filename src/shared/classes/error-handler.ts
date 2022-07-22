// import bunyan from 'bunyan';
import { BaseError } from './base-error';

export class ErrorHandler {
    // logger: bunyan;

    // constructor(logger: bunyan) {
    //     this.logger = logger;
    // }

    public async handleError(err: Error): Promise<void> {
        console.log('handleError', err);

    }

    public isTrustedError(error: Error) {
        console.log('isTrustedError', error);

        return error instanceof BaseError && error.isOperational;
    }
}