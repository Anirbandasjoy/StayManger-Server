import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "User email is required"],
      unique: true,
      match: [/.+\@.+\..+/, "Please enter a valid email address"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    profileImage: {
      type: String,
      default: null,
    },
    backgroundImage: {
      type: String,
      default: null,
    },
    phone: {
      type: String,
      required: [true, "User phone number is required"],
      match: [
        /^(\+8801|01)[3-9]\d{8}$/,
        "Please enter a valid Bangladeshi phone number",
      ],
      trim: true,
    },
    address: {
      type: String,
      trim: true,
      default: null,
    },
    department: {
      type: String,
      trim: true,
      default: null,
    },
    role: {
      type: String,
      default: "user",
      trim: true,
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
