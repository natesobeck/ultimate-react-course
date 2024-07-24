import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      //payload = newItem
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      // payload = itemId
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    increaseItemQuantity(state, action) {
      //payload = itemId
      const item = state.cart.find(item => action.payload === item.id)
      item.quantity++
      item.totalPrice = item.quantity * item.unitPrice
    },
    decreaseItemQuantity(state, action) {
      //payload = itemId
      const item = state.cart.find(item => action.payload === item.id)
      item.quantity--
    },
    clearCart(state) {
      state.cart = []
    },
  },
});

export const {addItem, deleteItem, increaseItemQuantity, decreaseItemQuantity, clearCart} = cartSlice.actions
export default cartSlice.reducer

export const getCart = (state) => state.cart.cart
export const getNumPizzas = state => state.cart.cart.reduce((sum, item) => sum + item.quantity, 0)
export const getTotalCartPrice = state => state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0)
export const getCurrentQuantityById = id => state => state.cart.cart.find(item => item.id === id)?.quantity ?? 0
