import { Schema, model, type InferSchemaType } from "mongoose";

const featureSchema = new Schema(
  {
    label: { type: String, required: true },
    included: { type: Boolean, default: true },
  },
  { _id: false }
);

const pricingPlanSchema = new Schema(
  {
    name: { type: String, required: true },
    monthly: { type: Number, default: null },
    yearly: { type: Number, default: null },
    desc: { type: String, default: "" },
    featured: { type: Boolean, default: false },
    popularLabel: { type: String, default: "" },
    features: { type: [featureSchema], default: [] },
    cta: { type: String, default: "Get started" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export type PricingPlanDoc = InferSchemaType<typeof pricingPlanSchema>;
export default model("PricingPlan", pricingPlanSchema);
