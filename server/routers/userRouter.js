import express from "express";
import userController from "../controllers/userController.js";
import isloggedIn from "../middleware/authMidleware.js";

const userRouter = express.Router();

userRouter
  .post("/signup", userController.userSignup)
  .post("/login", userController.userLogin)
  .get("/fetch", isloggedIn, userController.userFetch)
  .get("/logout", isloggedIn, userController.userLogout)
  .delete("/delete/:id", isloggedIn, userController.deleteUser);

export default userRouter;
