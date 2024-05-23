import { Request, Response, NextFunction } from "express";
import { successResponse } from "../helper/response";
import { createToken } from "../helper/jsonWebToken";
import {
  processRegistationExpiresIn,
  processRegistationSecretKey,
} from "../helper/secret";
import { createError } from "../helper/import";

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
    successResponse(res, {
      message: "Registation processing complete",
      payload: { token },
    });
  } catch (error) {
    next(error);
  }
};
