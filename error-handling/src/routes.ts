import express from "express";
import { homeController } from "./controllers/homeController";

export const routerHome = express.Router();

routerHome.get("/", homeController);
