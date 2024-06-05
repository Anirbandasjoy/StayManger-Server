import { model, Schema } from "mongoose";

const bookingSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    room: {
      type: Schema.Types.ObjectId,
      ref: "Room",
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

const Booking = model("Booking", bookingSchema);

export default Booking;
