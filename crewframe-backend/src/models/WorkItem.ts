import { Schema, model, type InferSchemaType } from "mongoose";

const workItemSchema = new Schema(
  {
    cat: { type: [String], default: [] },
    format: { type: String, enum: ["reel", "long"], required: true },
    img: { type: String, default: "" },
    videoUrl: { type: String, default: "" },
    title: { type: String, required: true },
    marker: { type: String, default: "Real Job" },
    dur: { type: String, default: "0:30" },
    loc: { type: String, default: "" },
    views: { type: String, default: "0 views" },
    job: { type: String, default: "" },
    desc: { type: String, default: "" },
    result: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export type WorkItemDoc = InferSchemaType<typeof workItemSchema>;
export default model("WorkItem", workItemSchema);
