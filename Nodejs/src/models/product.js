import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema({
  name: String,
  price: Number,
  priceSale: Number,
  image: String,
  description: String,
});
export default mongoose.model("Product", productSchema);
