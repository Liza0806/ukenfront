import { combineReducers, configureStore } from "@reduxjs/toolkit";
import groupReducer from "../slices/groupsSlice";
import eventReducer from "../slices/eventsSlice";
import userReducer  from "../slices/userSlice";
import paymertReducer from "../slices/paymentSlice"

const persistedState = localStorage.getItem('reduxState')
  ? JSON.parse(localStorage.getItem('rootState')!)
  : undefined;

const store = configureStore({
  reducer: combineReducers({
    groups: groupReducer,
    events: eventReducer,
    users: userReducer,
    payment: paymertReducer,
  }),
  preloadedState: {...persistedState},
});


store.subscribe(() => {
//  console.log('start change LS')
  localStorage.setItem('rootState', JSON.stringify(store.getState()));
 // console.log('finish change LS')
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
