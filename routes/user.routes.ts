import { Router } from "express";
const userRouter = Router();

import {
  handleFindAllUsers,
  handleFindSingleUser,
  handleGetCurrentUser,
  handleProcessRegistation,
  handleRegisterdUser,
  handleUpdatePassword,
  handleUpdateUserInformation,
  handleUpdateUserRole,
} from "../controller/user.controller";
import {
  validateProcessRegistation,
  validateRegistationUser,
  validateUpdatePassword,
  validateUpdateUserRole,
} from "../validators/auth";
import { runValidation } from "../validators";
import { isAdmin, isLogin } from "../middleware/auth";

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

userRouter.get("/current-user", isLogin, handleGetCurrentUser);
userRouter.get("/find-allUsers", isLogin, isAdmin, handleFindAllUsers);
userRouter.get("/find-single-user/:id", handleFindSingleUser);
userRouter.patch(
  "/update-role/:id",
  validateUpdateUserRole,
  runValidation,
  isLogin,
  handleUpdateUserRole
);

userRouter.put("/update-userInfo/:id", isLogin, handleUpdateUserInformation);

export default userRouter;
