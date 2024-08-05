import { Router } from "express";
import {
  handleCreateReview,
  handleDeleteReview,
  handleFindRoomReview,
  handleUpdateReview,
} from "../controller/review.controller";
import { isLogin } from "../middleware/auth";
import {
  validateDeleteReview,
  validateFindRoomReview,
  validateReviewCreatedInput,
  validateUpdateUpdateReview,
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
  handleDeleteReview
);

reviewRouter.put(
  "/update-review/:reviewId",
  isLogin,
  validateUpdateUpdateReview,
  runValidation,
  handleUpdateReview
);

export default reviewRouter;
