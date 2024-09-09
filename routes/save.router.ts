import { Router } from "express";
import { isLogin } from "../middleware/auth";
import { validateSaveNotice } from "../validators/save";
import { runValidation } from "../validators";
import {
  handleDeleteSave,
  handleGetSaveNoticeForUser,
  handleSaveNotice,
} from "../controller/save.controller";

const saveRouter = Router();

saveRouter.post(
  "/notice/:noticeId",
  isLogin,
  validateSaveNotice,
  runValidation,
  handleSaveNotice
);
saveRouter.get("/find-notice", isLogin, handleGetSaveNoticeForUser);

saveRouter.delete("/save-delete/:noticeId", isLogin, handleDeleteSave);

export default saveRouter;
