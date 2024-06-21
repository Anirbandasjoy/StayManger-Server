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
      required: [true, "Profile image is required"],
    },
    backgroundImage: {
      type: String,
      default: "demo.png",
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
      required: [true, "User address is required"],
      trim: true,
    },
    department: {
      type: String,
      required: [true, "Department is required"],
      trim: true,
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
