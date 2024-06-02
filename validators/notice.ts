import { body } from "express-validator";

export const validateNotice = [
  body("caption").trim().notEmpty().withMessage("Caption is required"),
  body("noticeImage").trim(),
  body("author")
    .trim()
    .notEmpty().withMessage("Author is required")
    .isMongoId().withMessage("Author must be a valid MongoDB ID"),
];
