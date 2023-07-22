import express from "express";
import userController from "../controllers/userController.js";
import adminController from "../controllers/adminController.js";
import isloggedIn from "../middleware/authMidleware.js";
// import upload from "../middleware/multerMiddleware.js";

const userRouter = express.Router();

userRouter
  .post("/signup", userController.userSignup)
  .post("/login", userController.userLogin)
  .get("/fetch", isloggedIn, userController.userFetch)
  .get("/logout", isloggedIn, userController.userLogout)
  .delete("/delete/:id", isloggedIn, adminController.deleteUser)
  .patch("/update/:id", isloggedIn, adminController.updateUser);

export default userRouter;
