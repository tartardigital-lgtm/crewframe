import { Schema, model, type InferSchemaType } from "mongoose";

const testimonialSchema = new Schema(
  {
    quote: { type: String, required: true },
    name: { type: String, required: true },
    company: { type: String, default: "" },
    avatar: { type: String, default: "" },
    stars: { type: Number, default: 5, min: 0, max: 5 },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export type TestimonialDoc = InferSchemaType<typeof testimonialSchema>;
export default model("Testimonial", testimonialSchema);
