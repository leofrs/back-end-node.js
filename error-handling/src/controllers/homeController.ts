import { Request, Response } from "express";
import { BadRequestError } from "../helpers/api-error";

export const homeController = async (req: Request, res: Response) => {
  throw new BadRequestError("Erro lançado do homeController");
};
