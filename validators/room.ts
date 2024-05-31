import { body } from "express-validator";

export const validateRoomInput = [
  body("sitRent").trim().notEmpty().withMessage("sitRent is required"),
  body("roomImage").trim().notEmpty().withMessage("roomImage is required"),
];
