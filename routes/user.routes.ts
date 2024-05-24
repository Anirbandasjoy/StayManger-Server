import { Router } from "express";
const userRouter = Router();

import {
  handleProcessRegistation,
  handleRegisterdUser,
} from "../controller/user.controller";
import { validateProcessRegistation } from "../validators/auth";
import { runValidation } from "../validators";

userRouter.post("/process-registation", validateProcessRegistation, runValidation, handleProcessRegistation);
userRouter.post("/registation-user", handleRegisterdUser);

export default userRouter;
