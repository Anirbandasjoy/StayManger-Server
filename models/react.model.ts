import { model, Schema } from "mongoose";

const reactSchema = new Schema(
  {
    react: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    notice: {
      type: Schema.Types.ObjectId,
      ref: "Notice",
    },
  },
  { timestamps: true }
);

const React = model("React", reactSchema);

export default React;
