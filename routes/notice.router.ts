import { Router } from "express";
import {
  handleDeleteNotice,
  handleFindAllNotice,
  handleGetSingleNotice,
  handleNoticeCreate,
  handleUpdateNotice,
} from "../controller/notice.controller";
import { isAdmin, isLogin } from "../middleware/auth";
import {
  validateNotice,
  validateNoticeDeleteParam,
} from "../validators/notice";
import { runValidation } from "../validators";
import { validateParamsId } from "../validators/booking";

const noticeRouter = Router();

noticeRouter.post(
  "/create",
  isLogin,
  validateNotice,
  runValidation,
  isAdmin,
  handleNoticeCreate
);
noticeRouter.get("/find-allNotice", handleFindAllNotice);
noticeRouter.get(
  "/find-single-notice/:id",
  isLogin,
  validateParamsId,
  runValidation,
  handleGetSingleNotice
);
noticeRouter.put(
  "/update-notice/:id",
  isLogin,
  validateParamsId,
  runValidation,
  isAdmin,
  handleUpdateNotice
);
noticeRouter.delete(
  "/delete/:id",
  isLogin,
  isAdmin,
  validateNoticeDeleteParam,
  runValidation,
  handleDeleteNotice
);

export default noticeRouter;
