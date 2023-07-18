import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import hrRouter from "../routers/hrRouter.js";
import errorMidleware from "../middleware/errorMiddleware.js";

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
app.use(morgan("dev"));
app.use(cookieParser());

//Router
app.use("/api/hr", hrRouter);

app.all("*", (req, res) => {
  res.status(404).send("Oops! 404 Page not found");
});

app.use(errorMidleware);

export default app;
