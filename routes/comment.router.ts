import { Router } from "express";
import {
  handleCreateComment,
  handleDeleteComment,
  handleFindNoticeComment,
} from "../controller/comment.controller";
import { isLogin } from "../middleware/auth";
import {
  validateCommentInput,
  validateDeleteCommentParam,
  validateFIndNoticeComments,
} from "../validators/comment";
import { runValidation } from "../validators";
const commentRouter = Router();

commentRouter.post(
  "/create-comment/:noticeId",
  isLogin,
  validateCommentInput,
  runValidation,
  handleCreateComment
);

commentRouter.get(
  "/find-NoticeComments/:noticeId",
  validateFIndNoticeComments,
  runValidation,
  handleFindNoticeComment
);

commentRouter.delete(
  "/delete-comment/:commentId",
  isLogin,
  validateDeleteCommentParam,
  runValidation,
  handleDeleteComment
);

export default commentRouter;
