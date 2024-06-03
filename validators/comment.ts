import { body } from "express-validator";

export const validateCommentInput = [
  body("text").trim().notEmpty().withMessage("Comment text is required"),
  body("commentImage").trim(),
  body("user")
    .trim()
    .isMongoId()
    .withMessage("User must be a valid MongoDB ID"),
  body("notice")
    .trim()
    .isMongoId()
    .withMessage("Notice must be a valid MongoDB ID"),
];
