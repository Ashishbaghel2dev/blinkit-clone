import mongoose from "mongoose";

const { Schema, model } = mongoose;

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      default: "", 
    },
  },
  {
    timestamps: true,
  }
);

export default model("Category", CategorySchema);
