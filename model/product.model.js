import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true, 
      trim: true, 
    },
    image: {
      type: [String],
      default: [],
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category", 
      required: true, 
    },
    subCategoryId: {
      type: Schema.Types.ObjectId,
      ref: "SubCategory", 
    },
    unit: {
      type: String,
      default: "pcs",
    },
    stock: {
      type: Number, 
      required: true,
      default: 0, 
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0, 
    },
    description: {
      type: String,
      trim: true, 
    },
    more_detail: {
      type: Array, 
      default: [],
    },
    publish: {
      type: Boolean,
      default: true, 
    },
  },
  {
    timestamps: true,   
  }
);

export default model("Product", ProductSchema);
