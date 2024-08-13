import { Router } from 'express';
import { UserController } from '../controllers/userController';

export const userRouter = Router();
const userController = new UserController();

userRouter.post('/login', userController.getUser);
userRouter.post('/register', userController.registerUser);
userRouter.get('/user', userController.getUserId);
userRouter.get('/allUsers', userController.getAllusers);
