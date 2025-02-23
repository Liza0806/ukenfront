import { combineReducers, configureStore } from "@reduxjs/toolkit";
import groupReducer from "../slices/groupsSlice";
import eventReducer from "../slices/eventsSlice";
import userReducer from "../slices/userSlice";
import paymertReducer from "../slices/paymentSlice";
import { useDispatch, useSelector, useStore } from 'react-redux'
import { enableMapSet } from "immer";

enableMapSet();

const persistedState = localStorage.getItem('reduxState')
  ? JSON.parse(localStorage.getItem('reduxState')!)
  : undefined;

  const rootReducer = combineReducers({
    groups: groupReducer,
    events: eventReducer,
    users: userReducer,
    payments: paymertReducer,
  });
  
const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware(),
});

store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store
