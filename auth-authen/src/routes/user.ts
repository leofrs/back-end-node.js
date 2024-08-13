import { Router } from "express";
import { User } from "../controllers/userControllers";
import { authMiddleware } from "../middleware/authorization";

export const routerUser = Router();
const userController = new User();

routerUser.post("/user", userController.createUser);
routerUser.get("/user", authMiddleware, userController.getUser);
