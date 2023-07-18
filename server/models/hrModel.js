import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const hrSchema = new Schema(
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
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
        "Please Enter a valid Email address",
      ],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Minimun email length is 8 Characters"],
      trim: true,
      select: true,
    },

    employee: [
      {
        id: {
          type: String,
          required: true,
          trim: true,
        },
        name: {
          type: String,
          required: true,
          trim: true,
        },
        shift: {
          type: Number,
        },
        gender: {
          type: String,
          required: true,
        },
        employee_avatar: {
          public_id: { type: String },
          secure_url: { type: String },
        },
        dob: {
          type: String,
          required: false,
        },
        hiredate: {
          type: String,
          required: false,
        },
      },
    ],

    avatar: {
      public_id: { type: String },
      secure_url: { type: String },
    },

    role: {
      type: String,
      enum: ["Admin", "HR"],
      default: "HR",
    },
  },

  {
    timestamps: true,
  }
);

// Encrypt the password, then save in DataBase
hrSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

hrSchema.methods = {
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

const Hr = model("Hr", hrSchema);
export default Hr;
