import { param } from "express-validator";

export const validateRoomBookingInput = [
  param("id").trim().isMongoId().withMessage("id must be a valid MongoDB ID"),
];
