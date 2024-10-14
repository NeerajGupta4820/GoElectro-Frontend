import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.cartItems.push(action.payload);
      }

      state.totalQuantity += action.payload.quantity;
      state.totalAmount += action.payload.price * action.payload.quantity;

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    removeFromCart: (state, action) => {
        const itemIndex = state.cartItems.findIndex(
          (item) => item.id === action.payload.id
        );
      
        if (itemIndex !== -1) {
          const item = state.cartItems[itemIndex];
          state.totalQuantity -= item.quantity;
          state.totalAmount -= item.price * item.quantity;
          state.cartItems.splice(itemIndex, 1); // Remove the item from cart
          
          localStorage.setItem("cartItems", JSON.stringify(state.cartItems)); // Update localStorage
        }
      },

    updateQuantity: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        const newQuantity = action.payload.quantity;

        if (newQuantity < 1) {
          state.totalQuantity -= existingItem.quantity;
          state.totalAmount -= existingItem.price * existingItem.quantity;
          state.cartItems = state.cartItems.filter(
            (item) => item.id !== existingItem.id
          );
          toast.success("Deleted", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: true,
            theme: "dark",
          });
        } else {
          state.totalQuantity += newQuantity - existingItem.quantity;
          state.totalAmount +=
            (newQuantity - existingItem.quantity) * existingItem.price;
          existingItem.quantity = newQuantity;
        }

        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
      toast.success("Deleted", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        theme: "dark",
      });
      localStorage.removeItem("cartItems");
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart,setCart } =
  cartSlice.actions;

export default cartSlice.reducer;
