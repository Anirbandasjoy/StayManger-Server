import { Router } from "express";
import { isLogin } from "../middleware/auth";
import {
  handleGetMessage,
  handleSentMessage,
} from "../controller/message.controller";

const messageRouter = Router();

messageRouter.post("/send/:receiverId", isLogin, handleSentMessage);
messageRouter.get("/:userToChatId", isLogin, handleGetMessage);

export default messageRouter;
