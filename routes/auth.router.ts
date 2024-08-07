import { Router } from "express";
import { handleLogin, handleLogOut } from "../controller/auth.controller";
import { validateLoginUser } from "../validators/auth";
import { runValidation } from "../validators";
import { isLogin, isLogOut } from "../middleware/auth";
const authRouter = Router();

authRouter.post(
  "/login",
  isLogOut,
  validateLoginUser,
  runValidation,
  handleLogin
);
authRouter.post("/logOut", isLogin, handleLogOut);

export default authRouter;
