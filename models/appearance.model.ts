import { Document, model, Schema } from "mongoose";

interface appearanceType extends Document {
  font: string;
  language: string;
  theme: string;
  user: Schema.Types.ObjectId;
}

const appearanceSchema = new Schema<appearanceType>({
  font: {
    type: String,
    require: [true, "font is required"],
  },
  language: {
    type: String,
    required: [true, "language is required"],
  },
  theme: {
    type: String,
    required: [true, "theme is required"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "user is required"],
  },
});

const Appearance = model<appearanceType>("Appearance", appearanceSchema);

export default Appearance;
