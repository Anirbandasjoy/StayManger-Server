import { NextFunction, Request, Response } from "express";
import { successResponse } from "../helper/response";
import Room from "../models/room.model";
import { findWithId } from "../services";
import { createError } from "../helper/import";
import { Types } from "mongoose";
import Review from "../models/review.model";

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
    const rooms = await Room.find()
      .populate("sitOne")
      .populate("sitTwo")
      .populate("sitThere");
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
    const room = await Room.findById(id)
      .populate("sitOne")
      .populate("sitTwo")
      .populate("sitThere");
    if (!room) {
      return next(createError(404, "Room not found with this id"));
    }
    successResponse(res, {
      message: "Single room fetch successfully",
      payload: room,
    });
  } catch (error) {
    next(error);
  }
};

export const handleDeleteRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const deletedRoom = await Room.findByIdAndDelete(id);
    if (!deletedRoom) {
      return next(createError(400, "Room not deleted, somthing was rong"));
    }
    successResponse(res, {
      message: "Room was deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const handleRemoveUserToRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { roomId } = req.params;
  if (!req.user) {
    return next(createError(401, "User not Authnticated"));
  }
  const userId = req.user?._id;
  const userObjectId = new Types.ObjectId(userId);
  const room = await findWithId(roomId, Room);

  let seatRemoved = false;

  if (room.sitOne?.equals(userObjectId)) {
    room.sitOne = null;
    seatRemoved = true;
  } else if (room.sitTwo?.equals(userObjectId)) {
    room.sitTwo = null;
    seatRemoved = true;
  } else if (room.sitThree?.equals(userObjectId)) {
    room.sitThree = null;
    seatRemoved = true;
  }

  if (!seatRemoved) {
    return next(createError(400, "User has not booked a seat in this room"));
  }

  await room.save();

  successResponse(res, {
    message: "Remove user successfully in this room",
  });
  try {
  } catch (error) {
    next(error);
  }
};

export const handleRemoveRoomBookingUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { roomId, sitNumber } = req.body;
    if (!Types.ObjectId.isValid(roomId)) {
      return next(createError(400, "Invalid Room ID"));
    }

    const room = await Room.findById(roomId);
    if (!room) {
      return next(createError(404, "Room not found with this ID"));
    }
    if (sitNumber === 1) {
      room.sitOne = null;
    } else if (sitNumber === 2) {
      room.sitTwo = null;
    } else if (sitNumber === 3) {
      room.sitThere = null;
    } else {
      return next(createError(400, "Invalid sit number"));
    }
    await room.save();

    res.status(200).json({
      message: "User removed from the seat successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const handleFindTopRatingRooms = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const rooms = await Room.find()
      .populate("sitOne")
      .populate("sitTwo")
      .populate("sitThere");
    if (!rooms || rooms.length === 0) {
      return next(createError(404, "Not avilable room"));
    }
    const reviews = await Review.find().populate("user");
    const roomRatings = rooms.map((room) => {
      const roomReviews = reviews.filter((review: any) =>
        review.room.equals(room._id)
      );
      const totalRating = roomReviews.reduce(
        (sum: any, review: any) => sum + review.rating,
        0
      );
      const averageRating = roomReviews.length
        ? totalRating / roomReviews.length
        : 0;
      return { room, averageRating };
    });

    const topRatedRooms = roomRatings
      .filter(({ averageRating }) => averageRating === 5)
      .map(({ room }) => room);

    if (topRatedRooms.length === 0) {
      return next(createError(404, "No rooms with rating of 5 found"));
    }

    successResponse(res, {
      message: "Top rating rooms retrieved successfully",
      payload: topRatedRooms,
    });
  } catch (error) {
    next(error);
  }
};
