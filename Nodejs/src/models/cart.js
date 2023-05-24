import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  size: { type: Array, required: true, default: [] },
  color: { type: Array, required: true, default: [] },
  image: { type: Array, required: true, default: [] },
}); 

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  items: [cartItemSchema],
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
