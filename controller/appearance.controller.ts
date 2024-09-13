import { NextFunction, Request, Response } from "express";
import Appearance from "../models/appearance.model";
import { createError } from "../helper/import";
import { successResponse } from "../helper/response";

export const handleCreateAppearance = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return next(createError(401, "user not authnticated"));
    }
    const { font, language, theme } = req.body;
    const appearance = await Appearance.create({
      font,
      language,
      theme,
      user: req.user._id,
    });
    if (!appearance) {
      return next(
        createError(401, "Apperance not created , something  was wrong")
      );
    }

    successResponse(res, {
      statusCode: 201,
      message: "Appearance is created for this user",
    });
  } catch (error) {
    next(error);
  }
};

export const handleGetAppearance = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      next(createError(401, "user not authnticated"));
    }
    const appearance = await Appearance.find({ user: req.user?._id });
    if (!appearance) {
      return next(createError(404, "appearance not found for this user"));
    }
    successResponse(res, {
      message: "Returned appearance for this user",
      payload: appearance,
    });
  } catch (error) {
    next(error);
  }
};
