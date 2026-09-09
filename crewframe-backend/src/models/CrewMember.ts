import { Schema, model, type InferSchemaType } from "mongoose";

const skillSchema = new Schema(
  {
    label: { type: String, required: true },
    pct: { type: Number, required: true, min: 0, max: 100 },
  },
  { _id: false }
);

const crewMemberSchema = new Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    tag: { type: String, default: "" },
    img: { type: String, required: true },
    social: { type: [String], default: [] }, // "linkedin" | "instagram" | "youtube"
    bio: { type: String, default: "" },
    focusLabel: { type: String, default: "Focus" },
    skills: { type: [skillSchema], default: [] },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export type CrewMemberDoc = InferSchemaType<typeof crewMemberSchema>;
export default model("CrewMember", crewMemberSchema);
