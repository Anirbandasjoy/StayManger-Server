import { model, Schema } from "mongoose";

const AdminNoticenotificationSchema = new Schema(
  {
    read: {
      type: Boolean,
      default: false,
    },
    seen: {
      type: Boolean,
      default: false,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    author: {
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

const AdminNoticeNotification = model(
  "AdminNoticeNotification",
  AdminNoticenotificationSchema
);

export default AdminNoticeNotification;
