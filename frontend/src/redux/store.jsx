import { configureStore } from "@reduxjs/toolkit";
import userReducer, { UserDetailsSlice } from "./UserSlice";

export const store = configureStore({
  reducer: {
    users: userReducer,
  },
});

store.dispatch(UserDetailsSlice());
