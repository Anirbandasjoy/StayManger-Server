import { NextFunction, Request, Response } from "express";
import { createError, mongoose } from "../helper/import";
import { successResponse } from "../helper/response";
import Booking from "../models/booking.model";
import { findWithId } from "../services";
import Room from "../models/room.model";
export const handleBookingRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return next(createError(401, "User not Authnticated"));
    }
    if (req.user.role === "admin") {
      return next(createError(403, "Not Book form Admin"));
    }
    const userId = req.user._id;
    const { id } = req.params;
    const { sitNumber } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createError(400, "Invalid room ID format"));
    }
    // Check if the user already has a booking for this room
    const existingBooking = await Booking.exists({ user: userId, room: id });
    if (existingBooking) {
      return next(createError(409, "User already Send Room Book Request"));
    }

    await Booking.create({ user: userId, room: id, sitNumber });

    successResponse(res, {
      message: "Booking request Submitted",
    });
  } catch (error) {
    next(error);
  }
};

export const handleFindAllBookingRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookingRequest = await Booking.find()
      .populate("user")
      .populate("room");
    successResponse(res, {
      message: "Returned all booking request",
      payload: bookingRequest,
    });
  } catch (error) {
    next(error);
  }
};

export const handleRoomBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const booking = await findWithId(id, Booking);
    const room = await findWithId(booking.room, Room);
    if (booking.status === "cencel") {
      return next(createError(400, "Booking request alredy cencel"));
    }

    if (room.sitOne === null) {
      room.sitOne = booking.user;
    } else if (room.sitTwo === null) {
      room.sitTwo = booking.user;
    } else if (room.sitThree === null) {
      room.sitThree = booking.user;
    } else {
      return next(createError(400, "No available seat"));
    }
    booking.status = "success";
    await booking.save();
    await room.save();
    successResponse(res, {
      message: "Room booking successfully",
      payload: {
        booking,
        room,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const handleCencelRoomBookingRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const booking = await findWithId(id, Booking);
    if (booking.status === "success") {
      return next(createError(400, "Room already booking"));
    }
    booking.status = "cencel";
    await booking.save();
    successResponse(res, {
      message: "Request cencel",
      payload: booking,
    });
  } catch (error) {
    next(error);
  }
};

export const handleExistRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return next(createError(401, "User not Authnticated"));
    }
    const userId = req.user?._id;
    const roomId = req.params?.roomId;
    const booking = await Booking.findOne({ user: userId, room: roomId })
      .populate("user")
      .populate("room");
    if (!booking) {
      return next(createError(404, "Booking Request not found"));
    }
    successResponse(res, {
      message: "Returned request info",
      payload: booking,
    });
  } catch (error) {
    next(error);
  }
};

export const handleGetUserBookingRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return next(createError(401, "User don't authnticate"));
    }
    const userId = req.user?._id;
    const rooms = await Booking.find({ user: userId })
      .populate("user")
      .populate("room");
    successResponse(res, {
      message: "Return in this user all booking info",
      payload: rooms,
    });
  } catch (error) {
    next(error);
  }
};
