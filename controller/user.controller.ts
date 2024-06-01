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
import { userExistByEmail } from "../helper/exist";
import { findWithId } from "../services";

export const handleProcessRegistation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password, profileImage, phone, address, department } =
      req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    await userExistByEmail(email, User);
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
    const decoded = jwt.verify(
      token,
      processRegistationSecretKey
    ) as jwt.JwtPayload;
    if (!decoded) {
      throw createError(203, "Invalid Token");
    }

    await userExistByEmail(decoded.email, User);

    await User.create(decoded);
    successResponse(res, {
      message: "Registation Process Complete",
    });
  } catch (error) {
    next(error);
  }
};

export const handleUpdatePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { oldPassword, newPassword, confrimPassword } = req.body;
    const user = await findWithId(id, User);
    const matchPassword = await bcrypt.compare(oldPassword, user.password);
    if (!matchPassword) {
      throw createError(400, "Old password in incorrect");
    }
    if (newPassword !== confrimPassword) {
      throw createError(400, "newPassword and confrimpassword don't match");
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashPassword;
    await user.save();
    successResponse(res, {
      message: "Successfully updated password",
    });
  } catch (error) {
    next(error);
  }
};

export const handleGetCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    successResponse(res, {
      message: "Fetched currentUser Successfully",
      payload: req.user,
    });
  } catch (error) {
    next(error);
  }
};