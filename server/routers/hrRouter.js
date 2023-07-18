import express from "express";
import hrController from "../controllers/hrController.js";
import isloggedIn from "../middleware/authMidleware.js";

const hrRouter = express.Router();

hrRouter
  .post("/signup", hrController.hrSignup)
  .post("/login", hrController.hrLogin)
  .get("/fetch", isloggedIn, hrController.hrFetch)
  .get("/logout", isloggedIn, hrController.hrLogout);

export default hrRouter;
