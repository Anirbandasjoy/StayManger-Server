import mongoose from "mongoose";
import { createError } from "./import";

export const userExistByEmail = async (email: string, Model: any) => {
  console.log({ email, Model });
  try {
    const userExist = await Model.exists({ email });
    if (userExist) {
      throw createError(409, "User Already Exist");
    }
    return userExist;
  } catch (error) {
    if (error instanceof mongoose.Error) {
      throw createError(400, "invalid Email  ");
    }
    throw error;
  }
};
