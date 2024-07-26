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
import { validateUpdateRoomInput } from "../validators/room";

const noticeRouter = Router();

noticeRouter.post(
  "/create",
  isLogin,
  validateNotice,
  runValidation,
  isAdmin,
  handleNoticeCreate
);
noticeRouter.get("/find-allNotice", isLogin, handleFindAllNotice);
noticeRouter.get("/find-single-notice/:id", isLogin, handleGetSingleNotice);
noticeRouter.put(
  "/update-notice/:id",
  isLogin,
  validateUpdateRoomInput,
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
