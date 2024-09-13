import { NextFunction, Request, Response } from "express";
import { successResponse } from "../helper/response";
import Team from "../models/team.model";

export const handleGetAllTeamMember = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const teamMember = await Team.find();
    successResponse(res, {
      message: "Returned all team members",
      payload: teamMember,
    });
  } catch (error) {
    next(error);
  }
};
