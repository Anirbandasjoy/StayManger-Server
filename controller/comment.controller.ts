import { NextFunction, Request, Response } from "express";
import { successResponse } from "../helper/response";
import { createError } from "../helper/import";
import Comment from "../models/comment.model";

export const handleCreateComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?._id;
    const noticeId = req.params.noticeId;
    if (!userId) {
      return next(createError(404, "User Id not found, please try again"));
    }
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
