import { Request, Response, NextFunction } from "express";
import { successResponse } from "../helper/response";
import { createToken } from "../helper/jsonWebToken";
import {
  processRegistationExpiresIn,
  processRegistationSecretKey,
} from "../helper/secret";
import { createError, sendingEmail } from "../helper/import";
import { generateActivationEmailTemplate } from "../helper/emailTemplate";

export const handleProcessRegistation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password, profileImage, phone, address, department } =
      req.body;

    const token = createToken(
      { name, email, password, profileImage, phone, address, department },
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

    await sendingEmail(emailData);
    successResponse(res, {
      message: `Please Active you email : ${email}`,
      payload: { token },
    });
  } catch (error) {
    next(error);
  }
};
