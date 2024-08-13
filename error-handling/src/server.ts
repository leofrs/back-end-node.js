import "express-async-errors";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { routerHome } from "./routes";
import { errorMiddleware } from "./middlewares/errorMiddleware";

const server = express();
server.use(express.json());
server.use(cors());

dotenv.config();

server.use(routerHome);
//Middleware que trata dos erros de forma global
server.use(errorMiddleware);

server.listen(process.env.PORT, () => {
  console.log(`Servidor rodando com sucesso na porta: ${process.env.PORT}`);
});
