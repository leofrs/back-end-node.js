import express from "express";
import { userRouter } from "./routes/userRouter";
import { calendarioRouter } from "./routes/calendarioRoutes";

const app = express();
const PORT = 3005;

app.use(express.json());
app.use(userRouter);
app.use(calendarioRouter);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
