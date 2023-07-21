import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
    },

    lastname: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email Required"],
      unique: [true, "Email should be unique"],
      minlength: [6, "Minimun email length is 6 Characters"],
      maxlength: [50, "Maximun email length is 50 Characters"],
      lowercase: true,
      trim: true,
      match: [
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
        "Please enter a valid email address",
      ],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Minimun password length is 8 Characters"],
      trim: true,
      select: true,
    },

    phone: {
      type: String,
      // validate: {
      //   validator: (value) => validator.isMobilePhone(value, "en-IN"),
      //   message: "Please enter a valid phone number",
      // },
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },

    dob: {
      type: String,
      get: (dob) => {
        if (!dob) return "";
        return new Date().toLocaleDateString("en-IN");
      },
    },

    avatar: {
      public_id: { type: String },
      secure_url: { type: String },
    },

    role: {
      type: String,
      enum: ["ADMIN", "EMPLOYEE"],
      default: "EMPLOYEE",
    },

    // Model For Admin
    user: {
      type: Array,
    },
    userid: {
      type: String,
      minlength: [5, "Minimun Employee Id length is 5 Characters"],
      maxlength: [10, "Maximun Employee Id length is 10 Characters"],
    },
    hiredate: {
      type: String,
      default: new Date().toLocaleDateString("en-IN"),
    },
    leaveapplication: {
      type: String,
      maxlength: [200, "Maximun Characters allowed:200"],
    },
  },

  {
    timestamps: true,
  }
);

const capitalize = (str)=>str.charAt(0).toUpperCase()+str.slice(1).toLowerCase()

userSchema.pre("save", async function (next) {
  // Encrypt the password, then save in DataBase
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);

  // Capitalize the First and Last Name

  this.firstname = capitalize(this.firstname);
  this.lastname = capitalize(this.lastname);
  next();
});

userSchema.methods = {
  // Create JWT Token
  generateJWTToken: async function () {
    return jwt.sign(
      {
        id: this._id,
        email: this.email,
        subscription: this.subscription,
        role: this.role,
      },
      process.env.JWS_SECRET_KEY,
      {
        expiresIn: process.env.TOKEN_EXPIRY,
      }
    );
  },

  // ComparePassword
  comparePassword: async function (plainTextPassword) {
    return await bcrypt.compare(plainTextPassword, this.password);
  },
};

const User = model("User", userSchema);
export default User;
