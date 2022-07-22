// import { Router, Request, Response } from 'express';
// import { sign } from 'jsonwebtoken';
// import { passport } from '../config/passport';

// const authRouter = Router();
// var opts = {
//     secretOrKey: 'secret',
//     issuer: 'accounts.examplesoft.com',
//     audience: 'yourdomain.net'
// };
// authRouter.post('/login', (req: Request, res: Response) => {
//     const accesToken = sign(opts, 'accessTokenSecret');
//     const refreshToken = sign(opts, 'refreshTokenSecret');
//     res.send({ accesToken, refreshToken });
// });

// export { authRouter };
