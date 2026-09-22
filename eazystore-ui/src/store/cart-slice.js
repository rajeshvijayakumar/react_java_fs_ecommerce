import { createSlice } from "@reduxjs/toolkit";

// STEP 1 :[Set Initial Cart State]  Read the existing cart or set initial cart value mandatory...
const initialCart = JSON.parse(localStorage.getItem("cart")) || [];

// STEP 2: [Create/Define slice] defining the multiple reducer functions that are going to be used as acrions
const cartSlice = createSlice({
  name: "cart",
  initialState: initialCart,
  reducers: {
    // addToCart() is not a normal function; it is a Redux action creator:
    // const addToCart = (payload) => ({ type: 'cart/addToCart', payload })
    addToCart(state, action) {
      // same logics that are added in the cart context file for adding a item in the cart
      const { product, quantity } = action.payload;
      const existingItem = state.find(
        (item) => item.productId === product.productId,
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.push({ ...product, quantity });
      }
    },

    removeFromCart(state, action) {
      // same logics that are added in the cart context file for removing a item in the cart
      const { productId } = action.payload;
      return state.filter((item) => item.productId !== productId);
    },

    clearCart() {
      // same logics that are added in the cart context file for clear all items in the cart
      return [];
    },
  },
});

// STEP 3: [Export  Actions] - exporting the individual actions
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

// STEP 4: [Export/Return  Reducer] - Export/Return  as single reducer function  which contains all the  addToCart, removeCart, clearCart logics inside it...
export default cartSlice.reducer;


// STEP 5: [Create / Define Selectors] - Defining selector helper functions can be called / accessed  by useSelector hook.
export const selectCartItems = (state) => state.cart || [];    // cart selector for entire cart data will be available under "cart"

export const selectTotalQuantity = (state) =>     // quantity selector for calculating total no of items  in the cart
  Array.isArray(state.cart)
    ? state.cart.reduce((acc, item) => acc + item.quantity, 0)
    : 0;

export const selectTotalPrice = (state) =>          // totalprice selector for calculating total price value of the cart
  Array.isArray(state.cart)
    ? state.cart.reduce((acc, item) => acc + item.quantity * item.price, 0)
    : 0;
