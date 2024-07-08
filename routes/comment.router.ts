import { Router } from "express";
import {
  handleCreateComment,
  handleDeleteComment,
  handleFindNoticeComment,
  handleUpdateComments,
} from "../controller/comment.controller";
import { isLogin } from "../middleware/auth";
import {
  validateCommentInput,
  validateCommentUpdateParam,
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

commentRouter.put(
  "/update-comment/:commentId",
  isLogin,
  validateCommentUpdateParam,
  runValidation,
  handleUpdateComments
);

export default commentRouter;
