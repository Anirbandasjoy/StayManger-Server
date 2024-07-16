import { param } from "express-validator";

export const validateSaveNotice = [
  param("noticeId")
    .trim()
    .notEmpty()
    .withMessage("noticeId  is required")
    .isMongoId()
    .withMessage("noticeId must be a valid MongoDB ID"),
];
