import { Schema, model, type InferSchemaType } from "mongoose";

const adminSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    name: { type: String, default: "CrewFrame Admin" },
  },
  { timestamps: true }
);

export type AdminDoc = InferSchemaType<typeof adminSchema>;
export default model("Admin", adminSchema);
