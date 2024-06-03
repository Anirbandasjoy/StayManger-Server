import { model, Schema } from "mongoose";

const commentSchema = new Schema(
  {
    text: {
      type: String,
      requird: true,
    },
    commentImage: {
      type: String,
      default: null,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    notice: {
      type: String,
      ref: "Notice",
    },
  },
  { timestamps: true }
);

const Comment = model("Comment", commentSchema);

export default Comment;
