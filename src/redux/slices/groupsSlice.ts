import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addGroupTh, fetchAllGroups } from "../thunks/thunks";
import { GroupStateType, GroupType } from "../types/types";

const initialState: GroupStateType = {
  isLoading: false,
  error: undefined,
  groups: [],
};
const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    getGroups(state, action: PayloadAction<GroupType[]>) {
      state.groups = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllGroups.pending, (state) => {
        state.isLoading = true;
        console.log("pending");
      })
      .addCase(fetchAllGroups.fulfilled, (state, action) => {
        state.isLoading = false;
        state.groups = action.payload;
        console.log(action.payload);
      })
      .addCase(fetchAllGroups.rejected, (state, action) => {
        state.isLoading = false;
        //state.error = action.payload
        console.log(action.payload, "error");
      })
      .addCase(addGroupTh.pending, (state) => {
        state.isLoading = true;
        console.log("pending");
  })
  .addCase(addGroupTh.fulfilled, (state, action) => {

    state.isLoading = false;
    console.log(action, 'slice')

  })
  .addCase(addGroupTh.rejected, (state, action) => {
    state.isLoading = false;
    //state.error = action.payload
    console.log(action.payload, "error");
  })
  },
});

export const { getGroups } = groupsSlice.actions;
export default groupsSlice.reducer;
