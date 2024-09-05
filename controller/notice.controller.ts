import { NextFunction, Request, Response } from "express";
import { successResponse } from "../helper/response";
import Notice from "../models/notice.model";
import { createError } from "../helper/import";
import AdminNoticeNotification from "../models/adminNoticeNotification.model";
import { findWithId } from "../services";
import Comment from "../models/comment.model";
import React from "../models/react.model";
import { calculateNoticeScore } from "../services/notice";

export const handleNoticeCreate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return next(createError(401, "User not Authnticated"));
    }
    const notice = await Notice.create({
      caption: req.body.caption,
      noticeImage: req.body.noticeImage,
      author: req.user?._id,
    });

    const notificationData = {
      author: req.user._id,
      notice: notice._id,
    };
    const notification = await AdminNoticeNotification.create(notificationData);
    successResponse(res, {
      message: "Notice was a created successfully",
      payload: { notice, notification },
    });
  } catch (error) {
    next(error);
  }
};

export const handleFindAllNotice = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const notices = await Notice.find().populate("author").exec();
    const scoredNotices = await Promise.all(
      notices.map(async (notice) => {
        const commentsCount = await Comment.countDocuments({
          notice: notice._id,
        });
        const reactsCount = await React.countDocuments({ notice: notice._id });
        const score = calculateNoticeScore(notice, commentsCount, reactsCount);
        return { ...notice.toObject(), score, commentsCount, reactsCount };
      })
    );
    const sortedNotices = scoredNotices.sort((a, b) => b.score - a.score);

    successResponse(res, {
      message: "Fetched all notices with Facebook-like algorithm",
      payload: sortedNotices,
    });
  } catch (error) {
    next(error);
  }
};

export const handleGetSingleNotice = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const notice = await Notice.findById(id).populate("author");
    if (!notice) {
      return next(createError(404, "Notice not found with this id"));
    }
    successResponse(res, {
      message: "Returned single notice",
      payload: notice,
    });
  } catch (error) {
    next(error);
  }
};

export const handleUpdateNotice = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { caption, noticeImage } = req.body;
    const notice = await findWithId(id, Notice);
    if (caption !== undefined) notice.caption = caption;
    if (noticeImage !== undefined) notice.noticeImage = noticeImage;
    await notice.save();
    successResponse(res, {
      message: "Updated notice successfully",
      payload: notice,
    });
  } catch (error) {
    next(error);
  }
};

export const handleDeleteNotice = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const notice = await Notice.findByIdAndDelete(id);
    if (!notice) {
      return next(createError(404, "Notice not found with this id"));
    }
    successResponse(res, {
      message: "Notice is deleted",
    });
  } catch (error) {
    next(error);
  }
};
