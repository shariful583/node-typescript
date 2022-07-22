import express, { Application } from 'express';
// import { authRouter } from './auth';
import { userRouter } from './user';

export const router = (app: Application) => {
    // app.use('/', authRouter);
    app.use('/', userRouter);
}