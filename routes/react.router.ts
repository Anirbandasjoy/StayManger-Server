import { Router } from "express";
import { isLogin } from "../middleware/auth";
import {
  validateDeleteReactParam,
  validateFindNoticeReact,
  validateReactInput,
} from "../validators/react";
import { runValidation } from "../validators";
import {
  handleCreateReact,
  handleDeleteReact,
  handleFindNoticeReact,
} from "../controller/react.controller";
const reactRouter = Router();

reactRouter.post(
  "/create/:noticeId",
  isLogin,
  validateReactInput,
  runValidation,
  handleCreateReact
);

reactRouter.get(
  "/find-notice-react/:noticeId",
  isLogin,
  validateFindNoticeReact,
  runValidation,
  handleFindNoticeReact
);

reactRouter.delete(
  "/delete-react/:reactId",
  isLogin,
  validateDeleteReactParam,
  runValidation,
  handleDeleteReact
);

export default reactRouter;
