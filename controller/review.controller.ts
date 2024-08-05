import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express";
import { successResponse } from "../helper/response";
import { createError } from "../helper/import";
import Review from "../models/review.model";
import { findWithId } from "../services";
const { ObjectId } = mongoose.Types;
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
  const roomReview = await Review.find({ room: roomId }).populate("user");
  try {
    successResponse(res, {
      message: `Returned all room : ${roomId} review`,
      payload: roomReview,
    });
  } catch (error) {
    next(error);
  }
};

export const handleDeleteReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return next(createError(401, "User not Authnticated"));
    }
    const reviewId = req.params.reviewId;
    const review = await findWithId(reviewId, Review);
    const reviewerUserID = review?.user;
    const userId = new ObjectId(req.user._id);
    if (!reviewerUserID.equals(userId)) {
      return next(createError(403, "you are not Review author"));
    }

    await Review.findByIdAndDelete(reviewId);
    successResponse(res, {
      message: "Review was deleted",
    });
  } catch (error) {
    next(error);
  }
};
