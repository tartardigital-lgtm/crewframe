import { Schema, model, type InferSchemaType } from "mongoose";

const faqItemSchema = new Schema(
  {
    q: { type: String, required: true },
    a: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export type FaqItemDoc = InferSchemaType<typeof faqItemSchema>;
export default model("FaqItem", faqItemSchema);
