import { Request, Response, NextFunction } from "express";
import { successResponse } from "../helper/response";
import { createToken } from "../helper/jsonWebToken";
import {
  processRegistationExpiresIn,
  processRegistationSecretKey,
} from "../helper/secret";
import { bcrypt, createError, jwt, sendingEmail } from "../helper/import";
import { generateActivationEmailTemplate } from "../helper/emailTemplate";
import User from "../models/user.model";

export const handleProcessRegistation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password, profileImage, phone, address, department } =
      req.body;

    const hashPassword = await bcrypt.hash(password, 10);

    const userExist = await User.exists({ email });
    if (userExist) {
      throw createError(200, "User Already Exist");
    }

    const token = createToken(
      {
        name,
        email,
        password: hashPassword,
        profileImage,
        phone,
        address,
        department,
      },
      processRegistationSecretKey,
      processRegistationExpiresIn
    );
    if (!token) {
      throw createError(401, "Not Genaret Token");
    }

    const emailData = {
      email,
      subject: "User Activation Email",
      html: generateActivationEmailTemplate(name, token),
    };

    try {
      await sendingEmail(emailData);
    } catch (error) {
      console.error(error);
    }
    successResponse(res, {
      message: `Please Active you email : ${email}`,
      payload: { token },
    });
  } catch (error) {
    next(error);
  }
};

export const handleRegisterdUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.body;
    if (!token) {
      throw createError(404, "Token Not found");
    }
    const decoded = jwt.verify(token, processRegistationSecretKey);
    if (!decoded) {
      throw createError(203, "Invalid Token");
    }
    await User.create(decoded);
    successResponse(res, {
      message: "Registation Process Complete",
    });
  } catch (error) {
    next(error);
  }
};
