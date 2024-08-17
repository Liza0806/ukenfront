import { configureStore } from "@reduxjs/toolkit";
import groupReducer from '../slices/groupsSlice';
import eventReducer from '../slices/eventsSlice'

const store = configureStore({
    reducer: {
        groups: groupReducer,
        events: eventReducer
    }
})
export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;