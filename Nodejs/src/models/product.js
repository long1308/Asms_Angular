import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: String,
    price: Number,
    priceSale: Number,
    image: Array,
    rating: Number,
    quantity: Number,
    description: String,
    description_short: String,
    featured: {
      type: Boolean,
      default: false,
    },
    hot_sale: {
      type: Number,
      default: 0,
    },
    size: {
      type: [String],
      enum: ["XS", "S", "M", "L", "XL"],
    },
    color: {
      type: [String],
      enum: ["green", "blue", "pink", "red", "indigo"],
    },
    inventoryStatus: {
      type: String,
      enum: ["INSTOCK", "LOWSTOCK", "OUTOFSTOCK"],
    },
  },
  { timestamps: true, versionKey: false }
);
productSchema.pre("save", function (next) {
  if (this.isModified("hot_sale") || this.isModified("price")) {
    this.priceSale = this.price * (1 - this.hot_sale / 100);
  }
  switch (true) {
    case this.quantity <= 0:
      this.inventoryStatus = "OUTOFSTOCK";
      break;
    case this.quantity <= 10:
      this.inventoryStatus = "LOWSTOCK";
      break;
    default:
      this.inventoryStatus = "INSTOCK";
  }
  next();
});
export default mongoose.model("Product", productSchema);
