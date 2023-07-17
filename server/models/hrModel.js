import { Schema } from "mongoose";

const hrSchema = new Schema({
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
  },
  password:{
    type: String,
    required: [true, "Email Required"],
    minlength: [8, "Minimun email length is 8 Characters"],
  },
  employee:{
    [
        {
            id:{
                type: String,
            }
        }
    ]
  },
});
