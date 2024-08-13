import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

export class userAuth {
  async userAuthenticator(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) return res.status(404).send("Usúario não encontrado");

    const valuePassword = await compare(password, user.password);

    if (!valuePassword) return res.status(404).send("Senha incorreta");

    const token = sign({ id: user.id }, "secret", { expiresIn: "1d" });

    const userAndToken = user && token;

    res.json(userAndToken);
  }
}
