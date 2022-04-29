import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/slice";
// ...
const store = configureStore({
    reducer: combineReducers({
        auth: authSlice,
    }),
});

export default store;
