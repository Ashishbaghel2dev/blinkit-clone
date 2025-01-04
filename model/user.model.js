import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "",
    },
    mobile: {
      type: Number,
      default:0
      
    },
    refresh_token: {
      type: String,
      default: "",
    },
    verify_email: {
      type: Boolean,
      default: false,
    },
    last_date_login: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Suspended"],
      default: "Active",
    },
    address_details: [
      {
        type: Schema.Types.ObjectId,
        ref: "Address",
      },
    ],
    shopping_cart: [
      {
        type: Schema.Types.ObjectId,
        ref: "CartProduct",
      },
    ],
    orderHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    forgot_password_otp: {
      type: String,
      default:""
    },
    forgot_password_expiry: {
      type: Date,
      default:""
    },
    role: {
      type: String,
      enum: ["User", "Admin"],
      default: "User",
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

export default mongoose.model("User", UserSchema);
