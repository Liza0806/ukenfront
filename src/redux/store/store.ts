import { configureStore } from "@reduxjs/toolkit";
import groupReducer from "../slices/groupsSlice";
import eventReducer from "../slices/eventsSlice";
import userReducer  from "../slices/userSlice";

const store = configureStore({
  reducer: {
    groups: groupReducer,
    events: eventReducer,
    users: userReducer,
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
