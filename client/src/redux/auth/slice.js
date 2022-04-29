import { createSlice } from "@reduxjs/toolkit";
import { LS_KEYS } from "../../utils/constants";

// Define the initial state using that type
const initialState = {
  authState:
    localStorage.getItem(LS_KEYS.IS_LOGGED_IN) === "1"
      ? "LOGGINGIN"
      : "LOGGEDOUT",
  token: "",
  refreshToken: localStorage.getItem(LS_KEYS.TOKEN) || "",
  user: {
    _id: "",
    name: "",
    email: "",
  },
};

export const authSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setAuth: (state, action) => {
      localStorage.setItem(LS_KEYS.IS_LOGGED_IN, "1");
      localStorage.setItem(LS_KEYS.TOKEN, action.payload.refreshToken || "");
      return { ...state, ...action.payload, authState: "LOGGEDIN" };
    },
    logout: (state) => {
      localStorage.removeItem(LS_KEYS.IS_LOGGED_IN);
      localStorage.removeItem(LS_KEYS.TOKEN);
      return { ...initialState, authState: "LOGGEDOUT" };
    },
  },
});

export const { setAuth, logout } = authSlice.actions;

export const selectTokens = (state) => ({
  refreshToken: state.auth.refreshToken,
  accessToken: state.auth.token,
});

export const selectUser = (state) => state.auth.user;

export const selectAuthState = (state) => state.auth.authState;

export default authSlice.reducer;
