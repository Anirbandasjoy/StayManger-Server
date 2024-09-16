import { model, Schema } from "mongoose";

const messageSchema = new Schema({
  senderId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "senderId is required"],
  },
  receiverId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "receiverId is required"],
  },
  message: {
    type: String,
    required: [true, "Message is required"],
  },
  attach: {
    type: String,
    default: null,
  },
});

const Message = model("Message", messageSchema);

export default Message;
