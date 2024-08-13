import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { routerUser } from "./routes/users";

const server = express();

server.use(cors());
server.use(express.json());

server.use(routerUser);

server.listen(8080, () => {
  console.log("Server running on port 8080");
});
