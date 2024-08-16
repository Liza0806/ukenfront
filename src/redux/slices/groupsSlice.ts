import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllGroups } from "../api/groupsApi";
import { fetchAllGroups } from "../thunks/thunks";


type PaymentType = {
  dailyPayment: number;
  monthlyPayment: number;
};
type ScheduleType = {
  day: string;
  time: string;
};

type ParticipantType = {
  id: string;
  name: string;
};

export type EventType = {
  date: Date;
  isCancelled: boolean;
  participants: ParticipantType[];
  _id: string;
};
export type GroupType = {
  _id: string, 
  title: string,
  coachId: string,
  payment: PaymentType;
  schedule: ScheduleType;
  events: EventType;
};

type StateType = {
    isLoading: boolean,
    error: string | undefined,
    groups: GroupType[];
}
const initialState: StateType = {
    isLoading: false,
    error: undefined,
    groups: []

}
const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    getGroups(state, action :PayloadAction<GroupType[]>){
        state.groups = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchAllGroups.pending, (state) => {
        state.isLoading = true
        console.log('pending')
    })
    .addCase(fetchAllGroups.fulfilled, (state, action) => {
        state.isLoading = false
        state.groups = action.payload
        console.log(action.payload)
    })
    .addCase(fetchAllGroups.rejected, (state, action) => {
        state.isLoading = false
//state.error = action.payload
        console.log(action.payload, 'error')
    })
}});

export const { getGroups } = groupsSlice.actions;
export default groupsSlice.reducer;
