import { NextFunction, Request, Response } from "express";
import { successResponse } from "../helper/response";
import AdminNoticeNotification from "../models/adminNoticeNotification.model";

// get all notification
export const handleGetAllNotification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const notifications = await AdminNoticeNotification.find()
      .populate("author")
      .populate("notice");
    successResponse(res, {
      message: "Fetched all notifications",
      payload: notifications,
    });
  } catch (error) {
    next(error);
  }
};
