import { body, param } from "express-validator";

export const validateCommentInput = [
  body("text").trim().notEmpty().withMessage("Comment text is required"),
  body("commentImage").trim().optional(),
  param("noticeId")
    .trim()
    .notEmpty()
    .withMessage("notice id is required")
    .isMongoId()
    .withMessage("Notice must be a valid MongoDB ID"),
];

export const validateFIndNoticeComments = [
  param("noticeId")
    .trim()
    .notEmpty()
    .withMessage("notice id is required")
    .isMongoId()
    .withMessage("Notice must be a valid MongoDB ID"),
];

export const validateDeleteCommentParam = [
  param("commentId")
    .trim()
    .notEmpty()
    .withMessage("CommentId  is required")
    .isMongoId()
    .withMessage("CommentId must be a valid MongoDB ID"),
];

export const validateCommentUpdateParam = [
  param("commentId")
    .trim()
    .notEmpty()
    .withMessage("CommentId is required")
    .isMongoId()
    .withMessage("CommentId must be a valid MongoDB ID"),

  body("text").trim().notEmpty().withMessage("Comment text is required"),
];
