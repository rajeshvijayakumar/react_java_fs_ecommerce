import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart-slice";
import authReducer from "./auth-slice";

// STEP 6:[ Setting Up the Redux Store ] -  This creates your central Redux data store.
const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
});

// STEP 7: [Setting up Redux listener tool] - It acts like a security camera watching your Redux store.
// Every single time an action is dispatched (like adding an item, removing an item, or clearing the cart),
// Redux immediately runs the function inside this subscription.
store.subscribe(() => {
  try {
    // CART persistence
    const cart = store.getState().cart;
    localStorage.setItem("cart", JSON.stringify(cart));

    // AUTH persistence
    const authState = store.getState().auth;
    if (authState.isAuthenticated) {
      localStorage.setItem("jwtToken", authState.jwtToken);
      localStorage.setItem("user", JSON.stringify(authState.user));
    } else {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("user");
    }
  } catch (error) {
    console.error("Failed to save state to localStorage:", error);
  }
});

// STEP 8: Export the Store
export default store;
