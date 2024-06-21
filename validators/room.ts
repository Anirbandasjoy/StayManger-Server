import { body, param } from "express-validator";

export const validateRoomInput = [
  body("sitRent").trim().notEmpty().withMessage("sitRent is required"),
  body("roomImage").trim().notEmpty().withMessage("roomImage is required"),
];

export const validateUpdateRoomInput = [
  body("sitRent").trim(),
  body("roomImage").trim(),
];

export const validateRoomParamsId = [
  param("roomId")
    .trim()
    .isMongoId()
    .withMessage("roomId must be a valid MongoDB ID"),
  param("userId")
    .trim()
    .isMongoId()
    .withMessage("userId must be a valid MongoDB ID"),
];
