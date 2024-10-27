import { combineReducers, configureStore } from "@reduxjs/toolkit";
import groupReducer from "../slices/groupsSlice";
import eventReducer from "../slices/eventsSlice";
import userReducer from "../slices/userSlice";
import paymertReducer from "../slices/paymentSlice";

const persistedState = localStorage.getItem('reduxState')
  ? JSON.parse(localStorage.getItem('reduxState')!)
  : undefined;

const store = configureStore({
  reducer: combineReducers({
    groups: groupReducer,
    events: eventReducer,
    users: userReducer,
    payment: paymertReducer,
  }),
  preloadedState: persistedState,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware(), // Убираем thunk, если он уже включен
});

store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
