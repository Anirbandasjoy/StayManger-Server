import { Router } from "express";
import {
  handleDeleteRoom,
  handleFindAllRoom,
  handleFindSingleRoom,
  handleRoomCreate,
  handleUpdateRommInfo,
} from "../controller/room.controller";
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

roomRouter.put("/update/:id", isLogin, isAdmin, handleUpdateRommInfo);
roomRouter.get("/find-allRooms", handleFindAllRoom);
roomRouter.get("/find-single-room/:id", isLogin, handleFindSingleRoom);
roomRouter.delete("/delete-room/:id", isLogin, isAdmin, handleDeleteRoom);

export default roomRouter;
