import express from "express";
import hrController from "../controllers/hrController.js";

const hrRouter = express.Router();

hrRouter
  .post("/signup", hrController.hrSignup)
  .post("/login", hrController.hrLogin)
  .get("/fetch", hrController.hrFetch)
  .get("/logout", hrController.hrLogout);

export default hrRouter;
