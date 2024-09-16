import { combineReducers, configureStore } from "@reduxjs/toolkit";
import groupReducer from "../slices/groupsSlice";
import eventReducer from "../slices/eventsSlice";
import userReducer  from "../slices/userSlice";

const persistedState = localStorage.getItem('reduxState')
  ? JSON.parse(localStorage.getItem('rootState')!)
  : undefined;

const store = configureStore({
  reducer: combineReducers({
    groups: groupReducer,
    events: eventReducer,
    users: userReducer,
  }),
  preloadedState: persistedState ?? [],
});

store.subscribe(() => {
  localStorage.setItem('rootState', JSON.stringify(store.getState()));
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
