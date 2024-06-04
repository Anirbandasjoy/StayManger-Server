import { Router } from "express";
import {
  handleFindAllNotice,
  handleGetSingleNotice,
  handleNoticeCreate,
} from "../controller/notice.controller";
import { isAdmin, isLogin } from "../middleware/auth";
import { validateNotice } from "../validators/notice";
import { runValidation } from "../validators";

const noticeRouter = Router();

noticeRouter.post(
  "/create",
  validateNotice,
  runValidation,
  isLogin,
  isAdmin,
  handleNoticeCreate
);
noticeRouter.get("/find-allNotice", isLogin, handleFindAllNotice);
noticeRouter.get("/find-single-notice/:id", isLogin, handleGetSingleNotice);

export default noticeRouter;
