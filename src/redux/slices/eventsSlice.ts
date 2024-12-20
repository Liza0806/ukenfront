import { fetchAllEvents, fetchEventById } from '../thunks/thunks';
import { EventStateType, EventTypeDB } from '../types/types';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const persistedState = localStorage.getItem('events')
  ? JSON.parse(localStorage.getItem('events')!)
  : undefined;

const initialState: EventStateType = {
    isLoading: false,
    error: undefined,
    events: persistedState ?? [],
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
    },
    clearCurrentEvent(state) {
      state.currentEvent = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchAllEvents.pending, (state) => {
      debugger
        state.isLoading = true
      //  console.log('pending')
    })
    .addCase(fetchAllEvents.fulfilled, (state, action) => {
      debugger
        state.isLoading = false
        state.events = action.payload
    //    console.log(action.payload)
    })
    .addCase(fetchAllEvents.rejected, (state, action) => {
      debugger
        state.isLoading = false
       state.error = action.payload
     //   console.log(action.payload, 'error')
    })
    .addCase(fetchEventById.pending, (state) => {
        state.isLoading = true
        state.error = undefined
     //   console.log('pending')
    })
    .addCase(fetchEventById.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentEvent = action.payload
      //  state.error = undefined
   //     console.log(action.payload)
    })
    .addCase(fetchEventById.rejected, (state, action) => {
      debugger
        state.isLoading = false
       state.error = action.payload
       debugger
    //    console.log(action.payload, 'error')
    })
}});

export const { setEvents, setCurrentEvent, clearCurrentEvent } = eventsSlice.actions;
export default eventsSlice.reducer;
