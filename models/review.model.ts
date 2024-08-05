import { model, Schema } from "mongoose";

const reviewSchema = new Schema(
  {
    message: {
      type: String,
      required: [true, "review message required"],
    },
    rating: {
      type: Number,
      require: [true, "rating is required field"],
    },

    user: {
      type: Schema.Types.ObjectId,
      required: [true, "User required"],
      ref: "User",
    },
    room: {
      type: Schema.Types.ObjectId,
      required: [true, "room is required field"],
      ref: "Room",
    },
  },
  { timestamps: true }
);

const review = model("review", reviewSchema);

export default review;
