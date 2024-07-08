import { Router } from "express";
import {
  handleCreateComment,
  handleFindNoticeComment,
} from "../controller/comment.controller";
import { isLogin } from "../middleware/auth";
import {
  validateCommentInput,
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

export default commentRouter;
