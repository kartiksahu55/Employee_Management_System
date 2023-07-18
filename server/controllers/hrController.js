import { token } from "morgan";
import Hr from "../models/hrModel.js";
import AppError from "../utils/errorUtils.js";

const cookieOption = {
  maxAge: 12 * 60 * 60 * 100,
  httpOnly: true,
  //   secure: true,
};

// -------------------Registration/Signup-------------------
const hrSignup = async (req, res, next) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    //  Check, if request contains all the required fields or not
    if (!firstname || !lastname || !email || !password) {
      return next(new AppError("All filds are required", 400));
    }

    //  Check Duplicate entry
    const checkDuplicate = await Hr.findOne({ email });
    if (checkDuplicate) {
      return next(new AppError("User already exist", 400));
    }

    const hr = await Hr.create({
      firstname,
      lastname,
      email,
      password,
      avatar: {
        public_id: email,
        secure_url:
          "https://res.cloudinary.com/demo/image/upload/d_avatar.png/non_existing_id.png",
      },
    });

    if (!hr) {
      return next(new AppError("Oops, Something went wrong", 400));
    }

    //TODO: File Upload--------------

    //   Save data to Database
    await hr.save();

    hr.password = undefined;

    //   Create json web token
    const token = await hr.generateJWTToken();

    //   Save the token in cookie and send the Success response
    res.cookie("token", token, cookieOption);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      hr,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

// -------------------Login-------------------
const hrLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //  Check, if request contains all the required fields or not
    if (!email || !password) {
      return next(new AppError("All filds are required", 400));
    }

    const hr = await Hr.findOne({ email }).select("+password");

    //   Check and validate email and password exist or not
    console.log(password);
    console.log(await hr.comparePassword(password));
    if (!hr || !(await hr.comparePassword(password))) {
      return next(new AppError("Email or Password does not match", 400));
    }

    hr.password = undefined;

    //   Create json web token
    const token = await hr.generateJWTToken();

    res.cookie("token", token, cookieOption);
    res.status(201).json({
      success: true,
      message: "Loggedin Successfully",
      hr,
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};

// -------------------Fetch/Get_Data-------------------
const hrFetch = async (req, res, next) => {
  try {
    // Get user(hr) Id from the authMiddleware
    const hrId = req.hrDetail.id;

    // Get the user(hr) data from the Database
    const hr = await Hr.findOne({ _id: hrId });
    hr.password = undefined;

    // Send user(hr) data as response
    res.status(200).json({
      success: true,
      message: "Data successfully fetched",
      hr,
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};

// -------------------Logout-------------------
const hrLogout = async (req, res, next) => {
  try {
    res.cookie("token", null, {
      maxAge: 0,
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "Logged Out  succefully",
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};

export default { hrSignup, hrLogin, hrFetch, hrLogout };
