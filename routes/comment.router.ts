import { Router } from "express";
import { handleCreateComment } from "../controller/comment.controller";
import { isLogin } from "../middleware/auth";
import { validateCommentInput } from "../validators/comment";
import { runValidation } from "../validators";
const commentRouter = Router();

commentRouter.post(
  "/create-comment/:noticeId",
  isLogin,
  validateCommentInput,
  runValidation,
  handleCreateComment
);

export default commentRouter;
