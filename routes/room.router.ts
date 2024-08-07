import { Router } from "express";
import {
  handleDeleteRoom,
  handleFindAllRoom,
  handleFindSingleRoom,
  handleRemoveUserToRoom,
  handleRoomCreate,
  handleUpdateRommInfo,
} from "../controller/room.controller";
import { isAdmin, isLogin } from "../middleware/auth";
import { validateRoomInput, validateRoomParamsId } from "../validators/room";
import { runValidation } from "../validators";
const roomRouter = Router();

roomRouter.post(
  "/create",
  isLogin,
  isAdmin,
  validateRoomInput,
  runValidation,
  handleRoomCreate
);

roomRouter.put("/update/:id", isLogin, isAdmin, handleUpdateRommInfo);
roomRouter.get("/find-allRooms", handleFindAllRoom);
roomRouter.get("/find-single-room/:id", isLogin, handleFindSingleRoom);
roomRouter.delete("/delete-room/:id", isLogin, isAdmin, handleDeleteRoom);
roomRouter.patch(
  "/removeUser-fromRoom/:roomId",
  isLogin,
  isAdmin,
  validateRoomParamsId,
  runValidation,
  handleRemoveUserToRoom
);

export default roomRouter;
