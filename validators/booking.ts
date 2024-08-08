import { body, param } from "express-validator";

export const validateParamsId = [
  param("id").trim().isMongoId().withMessage("id must be a valid MongoDB ID"),
];

export const validateCreateBookingRequest = [
  param("id").trim().isMongoId().withMessage("id must be a valid MongoDB ID"),
  body("sitNumber")
    .trim()
    .notEmpty()
    .withMessage("sitNumber is required feild")
    .isNumeric()
    .withMessage("Please provide number sit number"),
];

export const validateExistRequestInput = [
  param("roomId")
    .trim()
    .isMongoId()
    .withMessage("id must be a valid MongoDB ID"),
];
