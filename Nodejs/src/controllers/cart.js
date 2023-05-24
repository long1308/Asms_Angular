import Cart from "../models/cart";
import Product from "../models/product";
// Get all carts
const getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find().populate({
      path: "items.productId",
      model: "Product",
    });
    if (carts.length === 0) {
      return res.status(200).json({
        message: "Lấy danh sách Cart không thành công",
      });
    }
    return res.status(200).json({
      message: "Lấy danh sách Cart thành công",
      carts,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get a single cart by ID
const getCartById = async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await Cart.findById(id).populate({
      path: "items.productId",
      model: "Product",
    });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    res.status(200).json({
      message: "Lấy 1 Cart thành công",
      cart,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a new cart
const createCart = async (req, res) => {
  const { items, userId } = req.body;
  const { size, color, image } = items[0];
  try {
    //lấy product
    //lấy user
    const cart = await Cart.findOne({ userId });
    if (cart) {
      // kiểm tra sản phẩm đó đã có trong giỏ hàng chưa
      // Nếu sản phẩm chưa tồn tại, thêm vào giỏ hàng
      cart.items.push({
        productId: items[0].productId,
        size: [...size],
        color: [...color],
        image: [...image],
        // price: product.priceSale.quantity * quantity,
      });
      await cart.save();
      res.status(200).json({
        message: "Cập nhật giỏ hàng thành công",
        cart: cart,
      });
    } else {
      // Nếu chưa có giỏ hàng, tạo giỏ hàng mới và thêm sản phẩm vào
      const newCart = await Cart.create(req.body);
      res.status(201).json({
        message: "Thêm Cart thành công",
        cart: newCart,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a cart by ID
const updateCart = async (req, res) => {
  const { id } = req.params;
  const { items, totalQuantity, totalPrice } = req.body;
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      id,
      { items, totalQuantity, totalPrice },
      { new: true }
    );
    if (!updatedCart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a cart by ID
const deleteCart = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCart = await Cart.findByIdAndDelete(id);
    if (!deletedCart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    res.status(200).json({ message: "Cart deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Export the controller functions
export { getAllCarts, getCartById, createCart, updateCart, deleteCart };
