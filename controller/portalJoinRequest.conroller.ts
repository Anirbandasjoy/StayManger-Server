import { createError, NextFunction, Request, Response } from "../helper/import";
import { successResponse } from "../helper/response";
import PortalRequest from "../models/portal.request.model";
import User from "../models/user.model";
import { findWithId } from "../services";

export const handlePortalJoinRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return next(createError(401, "User not Authnticated"));
    }

    if (req.user.role === "admin") {
      return next(createError(401, "You are an admin"));
    }

    const exists = await PortalRequest.exists({ user: req.user._id });
    if (exists) {
      return next(createError(400, "Already send request"));
    }
    const request = await PortalRequest.create({ user: req.user._id });
    if (!request) {
      next(createError(400, "Somthing want wrong"));
    }
    successResponse(res, {
      message: "send your request",
      payload: request,
    });
  } catch (error) {
    next(error);
  }
};

export const handleAddedPortal = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const portal = await PortalRequest.findOne({ user: id });
    const user = await findWithId(id, User);
    if (!portal) {
      return next(createError(404, "Not found portal request with this id"));
    }
    if (user.role === "student") {
      return next(createError(400, "Already added portal"));
    }
    user.role = "student";
    portal.status = "accepet";

    await portal.save();
    await user.save();

    successResponse(res, {
      message: "your portal request has been accepted",
      payload: { portal, user },
    });
  } catch (error) {
    next(error);
  }
};

export const handleFindALlPoralRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const portalRequests = await PortalRequest.find().populate("user");
    successResponse(res, {
      message: "Returned all portal request",
      payload: portalRequests,
    });
  } catch (error) {
    next(error);
  }
};
