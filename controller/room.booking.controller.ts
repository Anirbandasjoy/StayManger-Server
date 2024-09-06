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
      payload: bookingRequest.reverse(),
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

    // Find the booking by ID and populate the user field
    const booking = await Booking.findById(id).populate("user");

    if (!booking) {
      return next(createError(404, "Booking not found"));
    }

    const room = await Room.findById(booking.room);

    if (!room) {
      return next(createError(404, "Room not found"));
    }
    if (booking.status === "cancel") {
      return next(createError(400, "Booking request already canceled"));
    }

    if (room.sitOne === null && booking.sitNumber === 1) {
      room.sitOne = booking.user?._id;
    } else if (room.sitTwo === null && booking.sitNumber === 2) {
      room.sitTwo = booking.user?._id;
    } else if (room.sitThere === null && booking.sitNumber === 3) {
      room.sitThere = booking.user?._id;
    } else {
      return next(createError(400, "No available seat"));
    }

    booking.status = "success";
    await booking.save();
    await room.save();

    successResponse(res, {
      message: "Room booked successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const handleCancelRoomBookingRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return next(createError(401, "User not authenticated"));
    }

    const { id } = req.params;
    const userId = req.user._id;
    const { sitNumber } = req.body;

    const booking = await Booking.findOne({
      room: id,
      user: userId,
      sitNumber: sitNumber,
    });

    if (!booking) {
      return next(createError(404, "Booking not found with this credential"));
    }

    if (booking.status === "success") {
      return next(createError(400, "Room has already been booked"));
    }

    await Booking.findByIdAndDelete(booking._id);
    const bookingId = booking?._id;

    successResponse(res, {
      message: "Booking request cancelled successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const handleFindSingleBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body) {
      return next(createError(403, "User not authnticated"));
    }
    const { bookingId } = req.params;
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return next(createError(404, "Booking not found with this id"));
    }
    successResponse(res, {
      message: "Returned single booking",
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

    const roomId = req.params?.roomId;
    const booking = await Booking.findOne({ room: roomId, user: req.user._id })
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
    let rooms = await Booking.find({ user: userId })
      .populate("user")
      .populate("room");
    rooms = rooms.reverse();

    successResponse(res, {
      message: "Return in this user all booking info",
      payload: rooms,
    });
  } catch (error) {
    next(error);
  }
};
