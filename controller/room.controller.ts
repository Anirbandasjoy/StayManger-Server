import { NextFunction, Request, Response } from "express";
import { successResponse } from "../helper/response";

export const handleRoomCreate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    successResponse(res, {
      message: "Room was created successfully",
    });
  } catch (error) {
    next(error);
  }
};
