import { Request, Response } from "express";
import { createUser, getUser } from "../utils/userPrisma";

export const create = async (req: Request, res: Response) => {
  try {
    const user = await createUser(req.body);

    res.status(201).json(user);
    console.log(user);
  } catch (error) {
    console.error(`O erro encontrado no controller create foi: ${error}`);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

export const get = async (req: Request, res: Response) => {
  try {
    const user = await getUser();
    res.status(200).json(user);
  } catch (error) {
    console.log(`O erro encontado no controller get foi: ${error}`);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};
