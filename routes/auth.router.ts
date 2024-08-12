import passport from "passport";
import { Router } from "express";
import {
  handleGithubLogin,
  handleGoogleLogin,
  handleLogin,
  handleLogOut,
} from "../controller/auth.controller";
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

authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  handleGoogleLogin
);

authRouter.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

authRouter.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  handleGithubLogin
);

authRouter.post("/logOut", isLogin, handleLogOut);

export default authRouter;
