import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: String,
    price: Number,
    priceSale: Number,
    image: String,
    description: String,
    description_short: String,
    featured: {
      type: Boolean,
      default: false,
    },
    hot_sale: {
      type: Number,
      default: 2,
    },
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
productSchema.pre("save", function (next) {
  if (this.hot_sale >= 0 && this.price) {
    this.priceSale = this.price * (1 - this.hot_sale / 100);
  }
  next();
});
export default mongoose.model("Product", productSchema);
