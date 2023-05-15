import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: String,
    price: Number,
    priceSale: Number,
    image: String,
    description: String,
    size: {
      type: [String],
      enum: ["XS", "S", "M", "L", "XL"],
    },
    color: {
      type: [String],
      enum: ["green", "blue", "pink", "red", "indigo"],
    },
  },
  { timestamps: true, versionKey: false }
);
export default mongoose.model("Product", productSchema);
