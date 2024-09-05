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
  handleUserDelete,
} from "../controller/user.controller";
import {
  validateProcessRegistation,
  validateRegistationUser,
  validateUpdatePassword,
  validateUpdateUserRole,
} from "../validators/auth";
import { runValidation } from "../validators";
import { isAdmin, isLogin } from "../middleware/auth";
import { validateParamsId } from "../validators/booking";

userRouter.post(
  "/process-registation",
  validateProcessRegistation,
  runValidation,
  handleProcessRegistation
);

userRouter.post(
  "/registation-user",
  validateRegistationUser,
  runValidation,
  handleRegisterdUser
);

userRouter.patch(
  "/update-password",
  isLogin,
  validateUpdatePassword,
  runValidation,
  handleUpdatePassword
);

userRouter.get("/current-user", isLogin, handleGetCurrentUser);
userRouter.get("/find-allUsers", isLogin, isAdmin, handleFindAllUsers);
userRouter.get(
  "/find-single-user/:id",
  isLogin,
  validateParamsId,
  runValidation,
  handleFindSingleUser
);
userRouter.patch(
  "/update-role/:id",
  validateUpdateUserRole,
  runValidation,
  isLogin,
  handleUpdateUserRole
);

userRouter.put("/update-userInfo", isLogin, handleUpdateUserInformation);
userRouter.delete("/delete-user", isLogin, isAdmin, handleUserDelete);

export default userRouter;
