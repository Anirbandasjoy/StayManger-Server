import { model, Schema } from "mongoose";

const saveSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "Save notice User id is required"],
    },
    notice: {
      type: Schema.Types.ObjectId,
      required: [true, "Notice id is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Save = model("Save", saveSchema);

export default Save;
