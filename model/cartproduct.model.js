import mongoose from "mongoose";

const { Schema, model } = mongoose;

const CartProductSchema = new Schema(
  {
    product_id: {
      type: Schema.Types.ObjectId, 
      ref: "Product", 
      required: true,
    },
    quantity: {
      type: Number,
      required: true, 
      default: 1, 
    },
    user_id: {
      type: Schema.Types.ObjectId, 
      ref: "User", 
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);

export default model("CartProduct", CartProductSchema);
