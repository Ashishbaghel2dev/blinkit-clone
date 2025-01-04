import mongoose from "mongoose";

const { Schema, model } = mongoose;

const SubCategorySchema = new Schema(
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
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category", 
      required: true
    },
  },
  {
    timestamps: true, 
  }
);

export default model("SubCategory", SubCategorySchema);
