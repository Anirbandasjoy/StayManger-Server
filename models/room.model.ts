import { model, Schema } from "mongoose";

const roomSchema = new Schema(
  {
    sitRent: {
      type: Number,
      required: [true, "SitRent is required"],
    },
    roomImage: {
      type: String,
      required: [true, "roomImage is required"],
    },
    sitOne: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    sitTwo: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    sitThere: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

const Room = model("Room", roomSchema);

export default Room;
