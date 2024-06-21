import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { errorResponse } from "../helper/response";

export const runValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, {
        statusCode: 422,
        message: errors.array()[0].msg,
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};
