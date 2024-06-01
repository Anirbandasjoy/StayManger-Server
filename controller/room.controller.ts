import { NextFunction, Request, Response } from "express";
import { successResponse } from "../helper/response";
import Room from "../models/room.model";

export const handleRoomCreate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await Room.create(req.body);
    successResponse(res, {
      message: "Room was created successfully",
    });
  } catch (error) {
    next(error);
  }
};
