import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import hrRouter from "../routers/hrRouter.js";

const app = express();
dotenv.config();

// Middleware Implement
app.use(express.json());
app.use(
  "*",
  cors({
    credentials: true,
    origin: false,
  })
);

app.use("/api/hr", hrRouter);

export default app;
