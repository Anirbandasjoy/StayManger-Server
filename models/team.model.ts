import { model, Schema } from "mongoose";

const contactSchema = new Schema({
  facebook: { type: String, required: true },
  instagram: { type: String, required: true },
  linkedIn: { type: String, required: true },
});

const teamMemberSchema = new Schema(
  {
    name: { type: String, required: true },
    profileImage: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contact: {
      type: contactSchema,
      required: true,
    },
  },
  { timestamps: true }
);

const TeamMember = model("TeamMember", teamMemberSchema);

export default TeamMember;
