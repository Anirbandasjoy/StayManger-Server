import { Router } from "express";
import {
  handleCreateAppearance,
  handleGetAppearance,
} from "../controller/appearance.controller";
import { isLogin } from "../middleware/auth";
import { validateAppearanceInput } from "../validators/appearance";
import { runValidation } from "../validators";
const appearanceRouter = Router();

appearanceRouter.post(
  "/create",
  isLogin,
  validateAppearanceInput,
  runValidation,
  handleCreateAppearance
);

appearanceRouter.get("/find-appearance", isLogin, handleGetAppearance);

export default appearanceRouter;
