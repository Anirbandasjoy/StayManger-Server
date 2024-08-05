import { Router } from "express";
import {
  handleCreateReview,
  handleFindRoomReview,
} from "../controller/review.controller";
import { isLogin } from "../middleware/auth";
import {
  validateDeleteReview,
  validateFindRoomReview,
  validateReviewCreatedInput,
} from "../validators/review";
import { runValidation } from "../validators";

const reviewRouter = Router();

reviewRouter.post(
  "/create/:roomId",
  isLogin,
  validateReviewCreatedInput,
  runValidation,
  handleCreateReview
);
reviewRouter.get(
  "/find-review/:roomId",
  validateFindRoomReview,
  runValidation,
  handleFindRoomReview
);
reviewRouter.delete(
  "/delete-review/:reviewId",
  isLogin,
  validateDeleteReview,
  runValidation,
  validateDeleteReview
);

export default reviewRouter;
