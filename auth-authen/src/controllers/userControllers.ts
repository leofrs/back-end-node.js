import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import bcrypt from "bcrypt";

export class User {
  async createUser(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const userExists = await prisma.user.findUnique({ where: { email } });

    if (!userExists) return res.status(404).send("Usúario já cadastrado");

    const crypt = await bcrypt.hash(password, 8);
    const userCreate = await prisma.user.create({
      data: {
        name,
        email,
        password: crypt,
      },
    });

    res.json(userCreate);
  }

  async getUser(req: Request, res: Response) {
    const user = await prisma.user.findMany({});
    res.json(user);
  }
}
