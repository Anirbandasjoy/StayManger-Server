import { Router } from "express";
import {
  handleFindAllNotice,
  handleGetSingleNotice,
  handleNoticeCreate,
  handleUpdateNotice,
} from "../controller/notice.controller";
import { isAdmin, isLogin } from "../middleware/auth";
import { validateNotice } from "../validators/notice";
import { runValidation } from "../validators";
import { validateUpdateRoomInput } from "../validators/room";

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
noticeRouter.put(
  "/update-notice/:id",
  validateUpdateRoomInput,
  runValidation,
  isLogin,
  isAdmin,
  handleUpdateNotice
);

export default noticeRouter;
