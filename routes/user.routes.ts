import { Router } from "express";
const userRouter = Router();

import { handleProcessRegistation } from "../controller/user.controller";

userRouter.post("/process-registation", handleProcessRegistation);

export default userRouter;
