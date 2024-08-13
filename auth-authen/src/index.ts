import express from "express";
import { routerUser } from "./routes/user";

const server = express();
const PORT = 4000;

server.use(express.json());

server.get("/", (req, res) => {
  res.send("Seja bem vindo a rota /");
});

server.use(routerUser);

server.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
