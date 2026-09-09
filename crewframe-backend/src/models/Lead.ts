import { Schema, model, type InferSchemaType } from "mongoose";

const leadSchema = new Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    trade: { type: String, default: "Something else" },
    message: { type: String, default: "" },
    status: {
      type: String,
      enum: ["new", "contacted", "won", "archived"],
      default: "new",
    },
  },
  { timestamps: true }
);

export type LeadDoc = InferSchemaType<typeof leadSchema>;
export default model("Lead", leadSchema);
