import { Router } from 'express';
import { passport } from '../config/passport';
import { userController } from '../controller/user-controller'
import { Jwt } from "../utils/jwt";
import MulterMidleware from '../middleware/multerMiddleware';
const formData = MulterMidleware.uploadMiddileware().none();
const middleware = MulterMidleware.uploadMiddileware('uploads/').fields([{ name: 'image' }, { name: 'text' }]);

const userRouter = Router();

userRouter.post('/register', [middleware], userController.register);
userRouter.post('/login', [formData], userController.login);
userRouter.post('/secure', [formData], Jwt.verifyAccessToken, async (req: any, res: any) => {
    console.log(req);

    res.status(200).json({ message: 'Secure route' });
});

export { userRouter };
