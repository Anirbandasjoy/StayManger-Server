import { Router } from "express";
import {
  handleBookingRequest,
  handleFindAllBookingRequest,
  handleRoomBooking,
} from "../controller/room.booking.controller";
import { isAdmin, isLogin } from "../middleware/auth";
import { validateRoomBookingInput } from "../validators/booking";
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
  validateRoomBookingInput,
  runValidation,
  isLogin,
  isAdmin,
  handleRoomBooking
);

export default bookingRouter;
