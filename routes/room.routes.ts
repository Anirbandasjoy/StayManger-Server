import { Router } from "express";
import { handleRoomCreate } from "../controller/room.controller";
const roomRouter = Router();

roomRouter.post("/create", handleRoomCreate);

export default roomRouter;
