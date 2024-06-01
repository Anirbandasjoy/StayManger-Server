import { NextFunction, Request, Response } from "express";
import { successResponse } from "../helper/response";
import Room from "../models/room.model";
import { findWithId } from "../services";

export const handleRoomCreate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await Room.create(req.body);
    successResponse(res, {
      message: "Room was created successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const handleUpdateRommInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { sitRent, roomImage } = req.body;
    const room = await findWithId(id, Room);
    if (sitRent !== undefined) room.sitRent = sitRent;
    if (roomImage !== undefined) room.roomImage = roomImage;
    await room.save();
    successResponse(res, {
      message: "RoomInfo was updated",
    });
  } catch (error) {
    next(error);
  }
};
