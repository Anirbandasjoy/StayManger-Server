import { model, Schema } from "mongoose";

const portalRequestSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      default: "pending",
      required: true,
    },
  },
  { timestamps: true }
);

const PortalRequest = model("PortalRequest", portalRequestSchema);

export default PortalRequest;
