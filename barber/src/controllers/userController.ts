import { Request, Response } from "express";

import { UserPrisma } from "../service/prisma";
const userPrisma = new UserPrisma();

export class UserController {
  async registerUser(req: Request, res: Response) {
    const { name, apelido, numero, password } = req.body;
    try {
      const user = await userPrisma.createuser(name, apelido, numero, password);
      if (user) {
        res.status(201).json("SUCESSO: Usúario criado");
        return user;
      } else {
        res.status(401).json("Error: Usúario não cadastrado");
      }
    } catch (error) {
      res.status(501).json(`Error interno encontrado: ${error}`);
    }
  }

  async getUser(req: Request, res: Response) {
    const { name, password } = req.body;

    // Validar entrada
    if (
      !name ||
      !password ||
      typeof name !== "string" ||
      typeof password !== "string"
    ) {
      return res
        .status(400)
        .json({ error: "Nome e senha são obrigatórios e devem ser strings." });
    }

    try {
      const user = await userPrisma.findUniqueUser(name, password);

      if (!user) {
        return res.status(401).json({ error: "Usuário não encontrado." });
      }

      return res.status(200).json({ id: user.id, name: user.name });
    } catch (error) {
      console.error("Erro interno:", error);
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
  }

  async getUserId(req: Request, res: Response) {
    const { id } = req.query;
    try {
      if (typeof id === "string") {
        const userId = parseInt(id);
        const user = await userPrisma.getUserById(userId);
        if (user) {
          res.status(200).json({ name: user.name });
        } else {
          res.status(401).json({ Error: "Usúario não encontrado" });
        }
      }
    } catch (error) {
      res.status(501).json(`Error interno encontrado: ${error}`);
    }
  }

  async getAllusers(req: Request, res: Response) {
    try {
      const getAll = await userPrisma.getAllUsers();
      if (getAll) {
        res.status(200).json(getAll);
      } else {
        res.status(401).json({ Error: "Usúarios não encontrados" });
      }
    } catch (error) {
      res.status(500).json({ ErrorInterno: "Error interno encontrado" });
    }
  }
}
