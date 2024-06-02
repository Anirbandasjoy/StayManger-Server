import { body } from "express-validator";

export const validateNotice = [
  body("caption").trim().notEmpty().withMessage("Name is required"),
  body("noticeImage").trim(),
  body("author").trim().notEmpty().withMessage("Author is required"),
];
