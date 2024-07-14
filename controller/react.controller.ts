import { NextFunction, Request, Response } from "express";
import { createError } from "../helper/import";
import React from "../models/react.model";
import AdminNoticeNotification from "../models/adminNoticeNotification.model";
import { errorResponse, successResponse } from "../helper/response";
import mongoose from "mongoose";
import { findWithId } from "../services";
const { ObjectId } = mongoose.Types;
export const handleCreateReact = async (
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
    const { react } = req.body;

    const existingReact = await React.findOne({
      notice: noticeId,
      user: userId,
    });
    if (existingReact) {
      return errorResponse(res, {
        statusCode: 403,
        message: "react already exists for this Notice and Profile",
      });
    }
    const newReact = await React.create({
      react,
      user: userId,
      notice: noticeId,
    });

    const notification = {
      author: userId,
      notice: noticeId,
    };
    const newNotification = await AdminNoticeNotification.create(notification);
    successResponse(res, {
      statusCode: 201,
      message: "Comment was created",
      payload: { newReact, newNotification },
    });
  } catch (error) {
    next(error);
  }
};

export const handleFindNoticeReact = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const noticeId = req.params.noticeId;
    const noticeReact = await React.find({
      notice: new ObjectId(noticeId),
    }).populate("user");
    successResponse(res, {
      message: "Notice Comment Returned",
      payload: noticeReact,
    });
  } catch (error) {
    next(error);
  }
};

export const handleDeleteReact = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return next(createError(401, "User not Authnticated"));
    }
    const reactId = req.params.reactId;
    const react = await findWithId(reactId, React);
    const reacterUserId = react?.user;
    const userId = new ObjectId(req.user._id);
    if (!reacterUserId.equals(userId)) {
      return next(createError(403, "you are not react author"));
    }

    await React.findByIdAndDelete(reactId);
    successResponse(res, {
      message: "React was deleted",
    });
  } catch (error) {
    next(error);
  }
};
