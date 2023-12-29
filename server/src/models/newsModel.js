import mongoose from "mongoose";

const { Schema } = mongoose;

const newsSchema = new Schema(
  {
    image: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: String, required: true },
    header: { type: String, required: true },
  },
  { timestamps: true }
);

export const News = mongoose.model("News", newsSchema);
