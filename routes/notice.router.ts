import { Router } from "express";
import {
  handleFindAllNotice,
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

export default noticeRouter;
