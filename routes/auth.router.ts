import { Router } from "express";
import { handleLogin, handleLogOut } from "../controller/auth.controller";
import { validateLoginUser } from "../validators/auth";
import { runValidation } from "../validators";
const authRouter = Router();

authRouter.post("/login", validateLoginUser, runValidation, handleLogin);
authRouter.get("/logOut", handleLogOut);

export default authRouter;
