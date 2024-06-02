import { NextFunction, Request, Response } from "express";
import { successResponse } from "../helper/response";
import Notice from "../models/notice.model";

export const handleNoticeCreate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const notice = await Notice.create(req.body);
    successResponse(res, {
      message: "Notice was a created successfully",
      payload: notice,
    });
  } catch (error) {
    next(error);
  }
};
