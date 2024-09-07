import { model, Schema, Document, Types } from "mongoose";

interface IRoom extends Document {
  sitRent: number;
  roomImage: string;
  sitOne: Types.ObjectId | null;
  sitTwo: Types.ObjectId | null;
  sitThere: Types.ObjectId | null;
}

const roomSchema = new Schema<IRoom>(
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
      default: null, // Allow null
    },
    sitTwo: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null, // Allow null
    },
    sitThere: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null, // Allow null
    },
  },
  { timestamps: true }
);

const Room = model<IRoom>("Room", roomSchema);

export default Room;
