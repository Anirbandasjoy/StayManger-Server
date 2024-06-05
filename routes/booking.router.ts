import { Router } from "express";
import {
  handleBookingRequest,
  handleCencelRoomBookingRequest,
  handleFindAllBookingRequest,
  handleRoomBooking,
} from "../controller/room.booking.controller";
import { isAdmin, isLogin } from "../middleware/auth";
import { validParamsId } from "../validators/booking";
import { runValidation } from "../validators";
const bookingRouter = Router();
bookingRouter.post("/booking-request/:id", isLogin, handleBookingRequest);
bookingRouter.get(
  "/findAll-booking-request",
  isLogin,
  isAdmin,
  handleFindAllBookingRequest
);
bookingRouter.put(
  "/booking-room/:id",
  validParamsId,
  runValidation,
  isLogin,
  isAdmin,
  handleRoomBooking
);

bookingRouter.patch(
  "/cencel-request/:id",
  validParamsId,
  runValidation,
  isLogin,
  isAdmin,
  handleCencelRoomBookingRequest
);

export default bookingRouter;
