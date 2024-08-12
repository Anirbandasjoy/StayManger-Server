import { model, Schema } from "mongoose";
import { UserDocument } from "../types/user.typs";

const userSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      required: [true, "User name is required"],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      match: [/.+\@.+\..+/, "Please enter a valid email address"],
      trim: true,
      default: null,
    },
    password: {
      type: String,
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

      trim: true,
      default: null,
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
    googleId: {
      type: String,
      default: null,
    },
    githubId: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const User = model<UserDocument>("User", userSchema);

export default User;

export { UserDocument };
