import { Router } from "express";
import { handleGetAllNotification } from "../controller/adminNotification.controller";
const adminNotificationRouter = Router();

adminNotificationRouter.get("/find-allNotification", handleGetAllNotification);

export default adminNotificationRouter;
