import User from "../models/userModel.js";
import AppError from "../utils/errorUtils.js";
import emailValidator from "email-validator";

const cookieOption = {
  path:"/",
  maxAge: 12 * 60 * 60 * 100,
  httpOnly: true,
    secure: true,
};

// -------------------User__Registration/Signup-------------------
const userSignup = async (req, res, next) => {
  try {
    const {
      firstname,
      lastname,
      gender,
      email,
      phone,
      password,
      role,
      employee,
    } = req.body;

    //  Check, if request contains all the required fields or not
    if (!firstname || !lastname || !email || !phone || !password) {
      return next(new AppError("All filds are required", 400));
    }

    //  Check Duplicate entry
    const checkDuplicate = await User.findOne({ email });
    if (checkDuplicate) {
      return next(new AppError("User already exist", 400));
    }

    const user = await User.create({
      firstname,
      lastname,
      email,
      phone,
      password,
      gender,
      avatar: {
        public_id: email,
        secure_url:
          "https://res.cloudinary.com/demo/image/upload/d_avatar.png/non_existing_id.png",
      },
      role,
      employee,
    });

    if (!user) {
      return next(new AppError("Oops, Something went wrong", 400));
    }

    //TODO: File Upload--------------

    //   Save data to Database
    await user.save();

    user.password = undefined;

    //   Create json web token
    const token = await user.generateJWTToken();

    //   Save the token in cookie and send the Success response
    res.cookie("token", token, cookieOption);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

// -------------------Login-------------------
const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //  Check, if request contains all the required fields or not
    if (!email || !password) {
      return next(new AppError("All filds are required", 400));
    }

    const isValidEmail = await emailValidator.validate(email);
    if (!isValidEmail) {
      return next(new AppError("Enter a valid email", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    //   Check and validate email and password exist or not
    console.log(password);
    if (!user || !(await user.comparePassword(password))) {
      return next(new AppError("Email or Password does not match", 400));
    }

    user.password = undefined;

    //   Create json web token
    const token = await user.generateJWTToken();

    res.cookie("token", token, cookieOption);
    res.status(201).json({
      success: true,
      message: "Loggedin Successfully",
      user,
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};

// -------------------Fetch/Get_Data-------------------
const userFetch = async (req, res, next) => {
  try {
    // Get user(user) Id from the authMiddleware
    const userId = req.user.id;

    console.log(userId);

    // Get the user(user) data from the Database
    const user = await User.findOne({ _id: userId });
    user.password = undefined;

    // Send user(user) data as response
    res.status(200).json({
      success: true,
      message: "Data successfully fetched",
      user,
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};

// -------------------Logout-------------------
const userLogout = async (req, res, next) => {
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

export default { userSignup, userLogin, userFetch, userLogout };
