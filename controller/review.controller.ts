import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express";
import { successResponse } from "../helper/response";
import { createError } from "../helper/import";
import Review from "../models/review.model";
import { findWithId } from "../services";
import User from "../models/user.model";
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
      return next(createError(403, "User not authenticated"));
    }

    const currentUser = await findWithId(req.user._id, User);

    const reviewId = req.params.reviewId;
    const review = await findWithId(reviewId, Review);

    if (!review) {
      return next(createError(404, "Review not found"));
    }

    const reviewerUserID = review.user;
    const userId = new ObjectId(req.user._id);

    if (!reviewerUserID.equals(userId) && currentUser?.role !== "admin") {
      return next(
        createError(403, "You are not the review author or an admin")
      );
    }

    await Review.findByIdAndDelete(reviewId);

    successResponse(res, {
      message: "Review was deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const handleUpdateReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return next(createError(401, "User not Authnticated"));
    }
    const { message, rating } = req.body;
    const reviewId = req.params.reviewId;
    const review = await findWithId(reviewId, Review);
    const reviewerUserId = review?.user;
    const userId = new ObjectId(req.user._id);
    if (!reviewerUserId.equals(userId)) {
      return next(createError(403, "you are not review author"));
    }

    const updateReview = await Review.findByIdAndUpdate(
      reviewId,
      { message, rating },

      { new: true }
    );
    if (!updateReview) {
      return next(createError(403, "not update review"));
    }
    successResponse(res, {
      message: "Review Updateded successfully",
      payload: updateReview,
    });
  } catch (error) {
    next(error);
  }
};
