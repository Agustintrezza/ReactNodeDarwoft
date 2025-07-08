import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { connect } from "./utils/connect";
import { authRouter } from "./routes/authRoutes";
import { taskRouter } from "./routes/taskRoutes";

const app = express();
const PORT = process.env.PORT || 2222;

app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/auth", authRouter);
app.use("/api/tasks", taskRouter);

app.listen(PORT, async () => {
  await connect();
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
