import express from "express";
import { create, get } from "../controllers/userController";

export const routerUser = express.Router();

routerUser.post("/users", create);
routerUser.get("/users", get);
