import { configureStore } from "@reduxjs/toolkit";
import groupReducer from '../slices/groupsSlice';
import visitsReducer from '../slices/visitsSlise'

const store = configureStore({
    reducer: {
        groups: groupReducer,
        visits: visitsReducer
    }
})
export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;