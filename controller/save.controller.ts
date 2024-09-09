import { NextFunction, Request, Response } from "express";
import { createError } from "../helper/import";
import Save from "../models/save.model";
import { errorResponse, successResponse } from "../helper/response";

export const handleSaveNotice = async (
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
    const existNotice = await Save.findOne({ notice: noticeId, user: userId });
    if (existNotice) {
      return errorResponse(res, {
        statusCode: 409,
        message: "Notice already exists for this Notice and Profile",
      });
    }
    const newSaveNotice = await Save.create({ user: userId, notice: noticeId });
    successResponse(res, {
      statusCode: 201,
      message: "Notice Save Successfully",
      payload: newSaveNotice,
    });
  } catch (error) {
    next(error);
  }
};

export const handleGetSaveNoticeForUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return next(createError(401, "User not Authnticated"));
    }
    const userId = req.user?._id;
    const notices = await Save.find({ user: userId })
      .populate({
        path: "notice",
        populate: {
          path: "author",
          model: "User",
        },
      })
      .populate({
        path: "user",
        model: "User",
      });

    successResponse(res, {
      message: "All notice returned for this user",
      payload: notices,
    });
  } catch (error) {
    next(error);
  }
};

export const handleDeleteSave = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body) {
      return next(createError(401, "User not authnticated"));
    }
    const { noticeId } = req.params;
    await Save.findOneAndDelete({ user: req.user?._id, notice: noticeId });
    successResponse(res, {
      message: "Deleted Save Notice",
    });
  } catch (error) {
    next(error);
  }
};
