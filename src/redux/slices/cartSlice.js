import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartId: null,
  cartItems: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartData: (state, action) => {
      const { cartItems, totalAmount, totalQuantity, _id } = action.payload;
      state.cartItems = cartItems;
      state.totalAmount = totalAmount;
      state.totalQuantity = totalQuantity;
      state.cartId = _id;

      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    },
    
    // Corrected addToCart reducer
    addToCart: (state, action) => {
      const { productId, price, quantity, name, images } = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.productId._id === productId
      );

      if (existingItem) {
        // If the item already exists, just update the quantity
        state.totalQuantity += quantity;
        existingItem.quantity += quantity;

        // Update total amount (accounting for additional quantity)
        state.totalAmount += price * quantity;

        toast.info(`${name} quantity updated`, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          theme: "dark",
        });
      } else {
        // If it's a new item, add it to the cart
        state.cartItems.push({
          productId: { _id: productId, title: name, price, images },
          quantity,
        });

        state.totalQuantity += quantity;
        state.totalAmount += price * quantity; // Correctly adding the price * quantity

        toast.success(`${name} added to cart`, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          theme: "dark",
        });
      }

      // Save the updated cart to local storage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    removeFromCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.productId._id === action.payload.productId
      );

      if (itemIndex !== -1) {
        const item = state.cartItems[itemIndex];
        state.totalQuantity -= item.quantity;
        state.totalAmount -= item.productId.price * item.quantity; // Correctly reduce price * quantity
        state.cartItems.splice(itemIndex, 1);

        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },

    updateQuantity: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item.productId._id === action.payload.productId
      );

      if (existingItem) {
        const newQuantity = action.payload.quantity;
        const quantityDifference = newQuantity - existingItem.quantity;

        if (newQuantity < 1) {
          state.totalQuantity -= existingItem.quantity;
          state.totalAmount -= existingItem.productId.price * existingItem.quantity;
          state.cartItems = state.cartItems.filter(
            (item) => item.productId._id !== existingItem.productId
          );
          toast.success("Deleted", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: true,
            theme: "dark",
          });
        } else {
          state.totalQuantity += quantityDifference;
          state.totalAmount +=
            quantityDifference * existingItem.productId.price; // Adjust total price based on quantity change
          existingItem.quantity = newQuantity;
        }

        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
      toast.success("Cart Cleared", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        theme: "dark",
      });
      localStorage.removeItem("cartItems");
    },
  },
});

export const { setCartData, addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
