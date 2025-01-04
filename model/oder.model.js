import mongoose from "mongoose";

const { Schema, model } = mongoose;

const OrderSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderId: {
      type: String,
      required: true,
    },
    productDetail: {
      type: Array, 
      default: [],
    },
    payment_id: {
      type: String,
    },
    payment_status: {
      type: String,
      enum: ["Pending", "Completed", "Failed"],
      default: "Pending",
    },
    delivery_address: {
      type: Object, 
      required: true,
    },
    delivery_status: {
      type: String,
      enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
    subTotalAmount: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    invoice_receipt: {
      type: String,
    },
  },
  {
    timestamps: true, 
  }
);

export default model("Order", OrderSchema);
