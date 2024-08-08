import { Router } from "express";
import {
  handleBookingRequest,
  handleCencelRoomBookingRequest,
  handleExistRequest,
  handleFindAllBookingRequest,
  handleRoomBooking,
} from "../controller/room.booking.controller";
import { isAdmin, isLogin } from "../middleware/auth";
import {
  validateCreateBookingRequest,
  validateExistRequestInput,
  validateParamsId,
} from "../validators/booking";
import { runValidation } from "../validators";
const bookingRouter = Router();
bookingRouter.post(
  "/booking-request/:id",
  isLogin,
  validateCreateBookingRequest,
  runValidation,
  handleBookingRequest
);
bookingRouter.get(
  "/findAll-booking-request",
  isLogin,
  isAdmin,
  handleFindAllBookingRequest
);
bookingRouter.put(
  "/booking-room/:id",
  validateParamsId,
  runValidation,
  isLogin,
  isAdmin,
  handleRoomBooking
);

bookingRouter.patch(
  "/cencel-request/:id",
  validateParamsId,
  runValidation,
  isLogin,
  isAdmin,
  handleCencelRoomBookingRequest
);

bookingRouter.get(
  "/exist-request/:roomId",
  isLogin,
  validateExistRequestInput,
  runValidation,
  handleExistRequest
);

export default bookingRouter;
