import { NextFunction, Request, Response } from "express";
import { successResponse } from "../helper/response";
import { createError } from "../helper/import";
import Comment from "../models/comment.model";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;
export const handleCreateComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return next(createError(401, "User not Authnticated"));
    }
    const userId = req.user?._id;
    const noticeId = req.params.noticeId;

    const { text, commentImage } = req.body;
    const newComment = await Comment.create({
      text,
      commentImage,
      user: userId,
      notice: noticeId,
    });

    successResponse(res, {
      statusCode: 201,
      message: "Comment was created",
      payload: newComment,
    });
  } catch (error) {
    next(error);
  }
};

export const handleFindNoticeComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const noticeId = req.params.noticeId;
    const noticeComments = await Comment.find({
      notice: new ObjectId(noticeId),
    }).populate("user");
    successResponse(res, {
      message: "Notice Comment Returned",
      payload: noticeComments,
    });
  } catch (error) {
    next(error);
  }
};
