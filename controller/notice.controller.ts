import { NextFunction, Request, Response } from "express";
import { successResponse } from "../helper/response";
import Notice from "../models/notice.model";
import { createError } from "../helper/import";
import AdminNoticeNotification from "../models/adminNoticeNotification.model";
import { findWithId } from "../services";
import User from "../models/user.model";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

export const handleNoticeCreate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return next(createError(401, "User not Authnticated"));
    }

    const user = await findWithId(req.user._id, User);
    const author = new ObjectId(req.body.author);
    if (!author.equals(user._id)) {
      return next(createError(403, "Forbidden access"));
    }
    const notice = await Notice.create(req.body);
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
) => {
  try {
    const notices = await Notice.find().populate("author");
    successResponse(res, {
      message: "Fetched all notice here",
      payload: notices,
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
