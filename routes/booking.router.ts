import { Router } from "express";
import {
  handleBookingRequest,
  handleCancelRoomBookingRequest,
  handleExistRequest,
  handleFindAllBookingRequest,
  handleFindSingleBooking,
  handleGetUserBookingRequest,
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

bookingRouter.delete(
  "/cencel-request/:id",
  isLogin,
  validateParamsId,
  runValidation,
  handleCancelRoomBookingRequest
);

bookingRouter.get(
  "/exist-request/:roomId",
  isLogin,
  validateExistRequestInput,
  runValidation,
  handleExistRequest
);

bookingRouter.get(
  "/user-allBooking-request",
  isLogin,
  handleGetUserBookingRequest
);

bookingRouter.get("/find-single/:bookingId", isLogin, handleFindSingleBooking);

export default bookingRouter;
