import { Router } from "express";
import {
  handleDeleteNotice,
  handleFindAllNotice,
  handleGetSingleNotice,
  handleNoticeCreate,
  handleUpdateNotice,
} from "../controller/notice.controller";
import { isAdmin, isLogin, isVerifyNotice } from "../middleware/auth";
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
  isAdmin,
  validateNotice,
  runValidation,
  handleNoticeCreate
);
noticeRouter.get(
  "/find-allNotice",
  isLogin,
  // isVerifyNotice,
  handleFindAllNotice
);
noticeRouter.get(
  "/find-single-notice/:id",
  isLogin,
  isVerifyNotice,
  validateParamsId,
  runValidation,
  handleGetSingleNotice
);
noticeRouter.put(
  "/update-notice/:id",
  isLogin,
  isAdmin,
  validateParamsId,
  runValidation,
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
