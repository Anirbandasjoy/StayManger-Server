import { NextFunction, Request, Response } from "express";
import { successResponse } from "../helper/response";
import { createError } from "../helper/import";
import Review from "../models/review.model";

export const handleCreateReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return next(createError(401, "User not Authnticated"));
    }
    const userId = req.user._id;
    const roomId = req.params.roomId;
    const { message, rating } = req.body;
    await Review.create({
      message,
      rating,
      user: userId,
      room: roomId,
    });
    successResponse(res, {
      message: "Review created",
    });
  } catch (error) {
    next(error);
  }
};

export const handleFindRoomReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const roomId = req.params.roomId;
  const roomReview = await Review.find({ room: roomId });
  try {
    successResponse(res, {
      message: `Returned all room : ${roomId} review`,
      payload: roomReview,
    });
  } catch (error) {
    next(error);
  }
};
