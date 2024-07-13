import { body, param } from "express-validator";

export const validateReactInput = [
  body("react").trim().notEmpty().withMessage("React is required"),
  param("noticeId")
    .trim()
    .isMongoId()
    .withMessage("Notice must be a valid MongoDB ID"),
];

export const validateFindNoticeReact = [
  param("noticeId")
    .trim()
    .notEmpty()
    .withMessage("notice id is required")
    .isMongoId()
    .withMessage("Notice must be a valid MongoDB ID"),
];

export const validateDeleteReactParam = [
  param("reactId")
    .trim()
    .notEmpty()
    .withMessage("reactId  is required")
    .isMongoId()
    .withMessage("reactId must be a valid MongoDB ID"),
];
