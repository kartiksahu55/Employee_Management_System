import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import userRouter from "../routers/userRouter.js";
import errorMidleware from "../middleware/errorMiddleware.js";

const app = express();
dotenv.config();

// Middleware Implement
app.use(express.json({limit:"20mb"}));
app.use(
  "https://empowerstaff.netlify.app/",
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(morgan("dev"));
app.use(cookieParser());

//Router
app.use("/api/user", userRouter);

// app.all("*", (req, res) => {
//   res.status(404).send("Oops! 404 Page not found");
// });

app.use(errorMidleware);

export default app;
