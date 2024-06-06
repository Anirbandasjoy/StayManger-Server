import { Router } from "express";
const userRouter = Router();

import {
  handleFindAllUsers,
  handleFindSingleUser,
  handleGetCurrentUser,
  handlePortalJoinRequest,
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
userRouter.delete("/delete-user/:id", isLogin, isAdmin, handleUserDelete);
userRouter.patch("/portal-join-request", isLogin, handlePortalJoinRequest);

export default userRouter;
