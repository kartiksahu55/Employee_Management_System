import User from "../models/userModel.js";
import AppError from "../utils/errorUtils.js";
import emailValidator from "email-validator";

const cookieOption = {
  path: "/",
  maxAge: 12 * 60 * 60 * 100,
  httpOnly: true,
  // secure: true,
};

// -------------------User__Registration/Signup-------------------
const userSignup = async (req, res, next) => {
  try {
    const {
      firstname,
      lastname,
      gender,
      dob,
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
      dob,
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
    if (!user || !(await user.comparePassword(password))) {
      return next(new AppError("Email or Password does not match", 400));
    }

    user.password = undefined;

    //   Create json web token
    const token = await user.generateJWTToken();

    res.cookie("token", token, cookieOption);
    res.status(201).json({
      success: true,
      message: "You are successfully logged in",
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

    // Get the user(user) data from the Database
    const user = await User.findOne({ _id: userId });
    user.password = undefined;

    // *****Check if Admin then fetch Employee Data*****
    if (user.role === "ADMIN") {
      const employeeData = await User.find({ role: "EMPLOYEE" }).select(
        "-password"
      );
      res.status(201).json({
        success: true,
        message: "You are successfully logged in",
        user,
        employeeData,
      });
    } else {
      // Send user(user) data as response
      res.status(200).json({
        success: true,
        message: "Data successfully fetched",
        user,
      });
    }
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

// ----------Delete User(Employee)(Admin allowed to access)----------
const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;

    console.log("Before", id);

    // Check if user id exist
    const verifyId = await User.findOne({ _id: id });
    console.log(verifyId);
    if (!verifyId) {
      return next(new AppError("User doesn't exist", 400));
    }

    const deleteUser = await User.findOneAndDelete({ _id: id });
    console.log("After", deleteUser);
    res.status(204).json({
      success: true,
      message: "Successfully Deleted",
      deleteUser,
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};

export default { userSignup, userLogin, userFetch, userLogout, deleteUser };
