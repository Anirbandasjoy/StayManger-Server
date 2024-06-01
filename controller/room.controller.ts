import { NextFunction, Request, Response } from "express";
import { successResponse } from "../helper/response";
import Room from "../models/room.model";
import { findWithId } from "../services";
import { createError } from "../helper/import";

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

export const handleFindAllRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const rooms = await Room.find();
    if (!rooms || rooms.length === 0) {
      return next(createError(404, "Not avilable room"));
    }
    successResponse(res, {
      message: "Fetched all rooms",
      payload: rooms,
    });
  } catch (error) {
    next(error);
  }
};

export const handleFindSingleRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const room = await findWithId(id, Room);
    successResponse(res, {
      message: "Single room fetch successfully",
      payload: room,
    });
  } catch (error) {
    next(error);
  }
};
