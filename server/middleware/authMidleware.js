import jwt from "jsonwebtoken";
import AppError from "../utils/errorUtils.js";

const isloggedIn = async (req, res, next) => {
  const token = req.cookies.token || null;

  if (!token) {
    return next(new AppError("Unuthenticated, Please Login again", 400));
  }

  const hrDetail = await jwt.verify(token, process.env.JWS_SECRET_KEY);

  req.hrDetail = hrDetail;

  next();
};

export default isloggedIn;
