import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

const initialState = {
  cartItems: []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(item => item._id === action.payload._id);
      if (!existingItem) {
        state.cartItems.push({ ...action.payload, quantity: 1 });
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "เพิ่มสินค้าเข้าตะกร้าแล้ว",
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        existingItem.quantity += 1;
        Swal.fire({
          title: "เพิ่มจำนวนสินค้าแล้ว",
          text: "สินค้านี้มีอยู่ในตะกร้าแล้ว เราได้เพิ่มจำนวนให้คุณ",
          icon: "info",
          confirmButtonText: "เข้าใจแล้ว"
        });
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item._id !== action.payload._id);
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
    increaseQuantity: (state, action) => {
      const item = state.cartItems.find(item => item._id === action.payload._id);
      if (item) item.quantity += 1;
    },
    decreaseQuantity: (state, action) => {
      const item = state.cartItems.find(item => item._id === action.payload._id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.cartItems = state.cartItems.filter(i => i._id !== item._id);
      }
    }
  }
});

// export the actions
export const {
  addToCart,
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity
} = cartSlice.actions;

export default cartSlice.reducer;
