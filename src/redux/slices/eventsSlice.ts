import { fetchAllEvents } from '../thunks/thunks';
import { EventTypeDB } from '../types/types';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type EventStateType = {
    isLoading: boolean,
    error: string | undefined,
    events: EventTypeDB[];
}
const initialState: EventStateType = {
    isLoading: false,
    error: undefined,
    events: []

}
const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    getEvents(state, action :PayloadAction<EventTypeDB[]>){
        state.events = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchAllEvents.pending, (state) => {
        state.isLoading = true
        console.log('pending')
    })
    .addCase(fetchAllEvents.fulfilled, (state, action) => {
        state.isLoading = false
        state.events = action.payload
        console.log(action.payload)
    })
    .addCase(fetchAllEvents.rejected, (state, action) => {
        state.isLoading = false
//state.error = action.payload
        console.log(action.payload, 'error')
    })
}});

export const { getEvents } = eventsSlice.actions;
export default eventsSlice.reducer;
