import cloudinary from "../config/cloudinaryConfig.js";
import User from "../models/userModel.js";
import AppError from "../utils/errorUtils.js";

// ----------Delete User(Employee)(Admin allowed to access)----------
const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;

    // Check if user id exist
    const verifyId = await User.findOne({ _id: id });
    if (!verifyId) {
      return next(new AppError("User doesn't exist", 400));
    }

    // Delete user from MongoDb
    const deleteUser = await User.findOneAndDelete({ _id: id });

    // Delete avatar image in cloudinary
    const avatarPublic_id = deleteUser.avatar.public_id;
    cloudinary.v2.uploader.destroy(avatarPublic_id, (err, result) => {
      if (err) {
        console.log("Error deleting image:", err);
      } else {
        console.log("Image deleted successfully:", result);
      }
    });

    res.status(204).json({
      success: true,
      message: "Successfully Deleted",
      deleteUser,
    });
  } catch (error) {
    console.log(error);
    return next(new AppError(error.message, 400));
  }
};

// ----------Update User(Employee)(Admin allowed to access)----------
const updateUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { avatar, avatarfile } = req.body;

    // Check and Verify, if Email exist (Duplicate Emil not allowed)
    // const reqEmail = req.body.email;
    // const verifyEmail = await User.findOne({ email: reqEmail }).select(
    //   "-password"
    // );
    // if (verifyEmail) {
    //   return next(new AppError("Email already exist!", 400));
    // }

    const cloudinaryResponse = await cloudinary.v2.uploader.upload(avatarfile, {
      folder: "EMS_Avatar",
      use_filename: true,
      transformation: [
        {
          height: 300,
        },
      ],
    });

    // Update avatar image in cloudinary
    //Check if image exist

    if (avatar.public_id) {
      console.log("avatar.public_id_test: ", avatar.public_id);
      // const publicIdCheck = await cloudinary.api.resource(avatar.public_id);

      // if(publicIdCheck.ava)

      cloudinary.v2.uploader.destroy(avatar.public_id, (err, result) => {
        if (err) {
          console.log("Delete Unsuccessful: ", err);
        } else {
          console.log("Delete Successful: ", result);
        }
      });
    }

    const payload = {
      ...req.body,
      avatar: {
        public_id: (cloudinaryResponse && cloudinaryResponse.public_id) || "",
        secure_url:
          (cloudinaryResponse && cloudinaryResponse.secure_url) ||
          "https://res.cloudinary.com/demo/image/upload/d_avatar.png/non_existing_id.png",
      },
    };
    payload.avatarfile = undefined;

    // Update user from MongoDb
    const doc = await User.findOneAndUpdate({ _id: id }, payload, {
      new: true,
    });

    doc.password = undefined;

    res.status(200).json({
      success: true,
      message: "Updated Successfully",
      doc,
    });
  } catch (error) {
    console.log(error);
    return next(new AppError(error.message, 400));
  }
};

export default { deleteUser, updateUser };
