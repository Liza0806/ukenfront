import { fetchAllEvents } from '../thunks/thunks';
import { EventTypeDB } from '../types/types';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type EventStateType = {
    isLoading: boolean,
    error: string | undefined,
    events: EventTypeDB[];
    currentEvent?: EventTypeDB | undefined;
}
const initialState: EventStateType = {
    isLoading: false,
    error: undefined,
    events: [],
    currentEvent: undefined
}
const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setEvents(state, action :PayloadAction<EventTypeDB[]>){
        state.events = action.payload
    },
    setCurrentEvent(state, action: PayloadAction<EventTypeDB>){
        state.currentEvent = action.payload
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

export const { setEvents, setCurrentEvent } = eventsSlice.actions;
export default eventsSlice.reducer;
