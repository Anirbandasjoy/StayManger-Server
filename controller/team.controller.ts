import { NextFunction, Request, Response } from "express";
import TeamMember from "../models/team.model";
import { successResponse } from "../helper/response";

export const handleGetAllTeamMember = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const teamMember = await TeamMember.find();
    successResponse(res, {
      message: "Returned all team members",
      payload: teamMember,
    });
  } catch (error) {
    next(error);
  }
};
