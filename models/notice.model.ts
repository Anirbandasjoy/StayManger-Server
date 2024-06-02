import { model, Schema } from "mongoose";

const noticeSchema = new Schema(
  {
    caption: {
      type: String,
      required: true,
    },
    noticeImage: {
      type: String,
      default: null,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Notice = model("Notice", noticeSchema);

export default Notice;
