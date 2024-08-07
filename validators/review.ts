import { body, param } from "express-validator";

export const validateReviewCreatedInput = [
  body("message")
    .trim()
    .notEmpty()
    .withMessage("Review message is required field"),
  body("rating")
    .trim()
    .notEmpty()
    .withMessage("Rating is required")
    .isNumeric()
    .withMessage("Rating input must be number")
    .isFloat({ min: 1, max: 5 })
    .withMessage("Rating must be number between 1 and 5"),
  param("roomId")
    .trim()
    .notEmpty()
    .withMessage("Room id is required")
    .isMongoId()
    .withMessage("Room id must be a valid MongoDB ID  ...."),
];

export const validateFindRoomReview = [
  param("roomId")
    .trim()
    .notEmpty()
    .withMessage("Room id is required")
    .isMongoId()
    .withMessage("Room id must be a valid MongoDB ID"),
];

export const validateDeleteReview = [
  param("reviewId")
    .trim()
    .notEmpty()
    .withMessage("Review id is required")
    .isMongoId()
    .withMessage("Review id must be a valid MongoDB ID"),
];

export const validateUpdateUpdateReview = [
  body("message")
    .trim()
    .notEmpty()
    .withMessage("Review message is required field"),
  body("rating")
    .trim()
    .notEmpty()
    .withMessage("Rating is required")
    .isNumeric()
    .withMessage("Rating input must be number")
    .isFloat({ min: 1, max: 5 })
    .withMessage("Rating must be number between 1 and 5"),
  param("reviewId")
    .trim()
    .notEmpty()
    .withMessage("Review id is required")
    .isMongoId()
    .withMessage("Review id must be a valid MongoDB ID"),
];
