import { Router } from "express";
import { handleRoomCreate } from "../controller/room.controller";
import { isAdmin, isLogin } from "../middleware/auth";
import { validateRoomInput } from "../validators/room";
import { runValidation } from "../validators";
const roomRouter = Router();

roomRouter.post(
  "/create",
  validateRoomInput,
  runValidation,
  isLogin,
  isAdmin,
  handleRoomCreate
);

export default roomRouter;
