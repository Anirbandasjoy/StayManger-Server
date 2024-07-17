import { body, param } from "express-validator";

export const validateNotice = [
  body("caption").trim().notEmpty().withMessage("Caption is required"),
  body("noticeImage").trim(),
  body("author")
    .trim()
    .notEmpty()
    .withMessage("Author is required")
    .isMongoId()
    .withMessage("Author must be a valid MongoDB ID"),
];

export const validateNoticeDeleteParam = [
  param("id")
    .trim()
    .notEmpty()
    .withMessage("notice is required")
    .isMongoId()
    .withMessage("notice must be a valid MongoDB ID"),
];
