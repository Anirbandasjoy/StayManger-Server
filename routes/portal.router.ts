import { Router } from "express";
import { isAdmin, isLogin } from "../middleware/auth";
import {
  handleAddedPortal,
  handlePortalJoinRequest,
} from "../controller/portalJoinRequest.conroller";
import { validateParamsId } from "../validators/booking";
import { runValidation } from "../validators";
const portalRouter = Router();

portalRouter.post("/portal-join-request", isLogin, handlePortalJoinRequest);
portalRouter.patch(
  "/accept-portal-joinRequest/:id",
  validateParamsId,
  runValidation,
  isLogin,
  isAdmin,
  handleAddedPortal
);

export default portalRouter;
