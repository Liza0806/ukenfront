import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type Participant = {
  id: String;
  name: String;
};

type Event = {
  date: Date;
  isCancelled: Boolean;
  participants: Participant[];
  _id: String;
};

type visitState = {
  isLoading: Boolean;
  error: Boolean;
  visits: Event[];
};
const initialState: visitState = {
  isLoading: false,
  error: false,
  visits: [],
};
const visitsSlice = createSlice({
  name: "visits",
  initialState,
  reducers: {
    getVisits(state, action: PayloadAction<Event[]>) {
      state.visits = action.payload;
    },
  },
});

export const { getVisits } = visitsSlice.actions;
export default visitsSlice.reducer;
