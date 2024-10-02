import { NextFunction, Request, Response } from "express";
import Conversation from "../models/conversation.model";
import Message from "../models/message.model";
import { getReceiverSocketId, io } from "../socket/socket";
import { createError } from "../helper/import";
import { successResponse } from "../helper/response";
export const handleSentMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return next(createError(401, "User not authnticated"));
    }
    const { receiverId } = req.params;
    const { message, attach = null } = req.body;
    const senderId = req.user?._id;

    if (!senderId || !receiverId) {
      return res.status(400).json({ error: "Invalid sender or receiver." });
    }

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
      attach,
    });

    conversation.messages.push(newMessage._id);

    await Promise.all([conversation.save(), newMessage.save()]);

    // Get receiver's socket ID
    const receiverSocketId = getReceiverSocketId(receiverId);

    // Emit new message event if receiver is connected
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    // Send success response
    successResponse(res, {
      message: "Message sent",
      payload: newMessage,
    });
  } catch (error) {
    next(error);
  }
};

export const handleGetMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return next(createError(401, "user not authnticated"));
    }
    const { userToChatId } = req.params;
    const senderId = req.user._id;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");
    if (!conversation) {
      return successResponse(res, {
        message: "Not found",
        payload: [],
      });
    }
    const messages = conversation.messages;

    successResponse(res, {
      message: "Returned all messages",
      payload: messages,
    });
  } catch (error) {
    next(error);
  }
};
