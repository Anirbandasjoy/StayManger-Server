import { Router } from "express";
const userRouter = Router();

import {
  handleProcessRegistation,
  handleRegisterdUser,
  handleUpdatePassword,
} from "../controller/user.controller";
import {
  validateProcessRegistation,
  validateRegistationUser,
  validateUpdatePassword,
} from "../validators/auth";
import { runValidation } from "../validators";
import { isLogin } from "../middleware/auth";

userRouter.post(
  "/process-registation",
  validateProcessRegistation,
  runValidation,
  isLogin,
  handleProcessRegistation
);
userRouter.post(
  "/registation-user",
  validateRegistationUser,
  runValidation,
  handleRegisterdUser
);

userRouter.post(
  "/update-password/:id",
  validateUpdatePassword,
  runValidation,
  handleUpdatePassword
);

export default userRouter;
