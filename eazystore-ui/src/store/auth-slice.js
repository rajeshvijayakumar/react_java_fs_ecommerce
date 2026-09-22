import { createSlice } from "@reduxjs/toolkit";

// STEP 1 :[Set Initial Auth State]  Read the existing auth information or set initial auth values mandatory...
const jwtToken = localStorage.getItem("jwtToken");
const user = localStorage.getItem("user");

const initialAuthState = {
  jwtToken: jwtToken || null,
  user: user ? JSON.parse(user) : null,
  isAuthenticated: !!(jwtToken && user),
};

// STEP 2: [Create/Define slice] defining the multiple reducer functions that are going to be used as acrions
const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    loginSuccess(state, action) {
      // same logics that are added in the auth context file for login success
      const { jwtToken, user } = action.payload;
      state.jwtToken = jwtToken;
      state.user = user;
      state.isAuthenticated = true;
    },

    logout(state) {
      // same logics that are added in the auth context file for logging out users.
      state.jwtToken = null;
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

// STEP 3: [Export  Actions] - exporting the individual actions
export const { loginSuccess, logout } = authSlice.actions;

// STEP 4: [Export/Return  Reducer] - Export/Return  as single reducer function  which contains all the  loginSuccess, logout logics inside it...
export default authSlice.reducer;

// STEP 5: [Create / Define Selectors] - Defining selector helper functions can be called / accessed  by useSelector hook.
export const selectJwtToken = (state) => state.auth.jwtToken; // jwt token selector for user session authentication

export const selectUser = (state) => state.auth.user; // user selector for accessing the logged user information.

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated; // isAuthenciated selector for reading the user logged in state.
