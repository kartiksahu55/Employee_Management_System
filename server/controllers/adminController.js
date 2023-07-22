import User from "../models/userModel.js";
import AppError from "../utils/errorUtils.js";

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

// ----------Update User(Employee)(Admin allowed to access)----------
const updateUser = async (req, res, next) => {
  try {
    const eId = req.params.id;

    // Check and Verify, if Email exist (Duplicate Emil not allowed)
    // const reqEmail = req.body.email;
    // const verifyEmail = await User.findOne({ email: reqEmail }).select(
    //   "-password"
    // );

    // if (verifyEmail) {
    //   return next(new AppError("Email already exist!", 400));
    // }

    const doc = await User.findOneAndUpdate({ _id: eId }, req.body, {
      new: true,
    });

    doc.password = undefined;

    res.status(200).json({
      success: true,
      message: "Updated Successfully",
      doc,
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};

export default { deleteUser, updateUser };
