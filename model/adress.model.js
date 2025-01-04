import mongoose from "mongoose";

const { Schema, model } = mongoose;

const AddressSchema = new Schema(
  {
    address_line: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      default: "", 
    },
    state: {
      type: String,
      default: "",
    },
    pincode: {
      type: String,
      default: "",
    },
    country: {
      type: String,
      default: "",
    },
    mobile: {
      type: Number,
      unique: true, 
    },
  },
  {
    timestamps: true, 
  }
);

export default model("Address", AddressSchema);
