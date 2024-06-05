import { Router } from "express";
import {
  handleBookingRequest,
  handleFindAllBookingRequest,
} from "../controller/room.booking.controller";
import { isAdmin, isLogin } from "../middleware/auth";
const bookingRouter = Router();
bookingRouter.post("/booking-request/:id", isLogin, handleBookingRequest);
bookingRouter.get(
  "/findAll-booking-request",
  isLogin,
  isAdmin,
  handleFindAllBookingRequest
);

export default bookingRouter;
