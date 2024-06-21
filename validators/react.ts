import { body } from "express-validator";

export const validateReactInput = [
  body("react").trim().notEmpty().withMessage("React  is required"),
  body("user")
    .trim()
    .isMongoId()
    .withMessage("User must be a valid MongoDB ID"),
  body("notice")
    .trim()
    .isMongoId()
    .withMessage("Notice must be a valid MongoDB ID"),
];
