import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addGroupTh, deleteGroupTh, fetchAllGroups, updateGroupTh } from "../thunks/thunks";
import { GroupStateType, GroupType } from "../types/types";
import { group } from "console";

const persistedState = localStorage.getItem("groups")
  ? JSON.parse(localStorage.getItem("groups")!)
  : undefined;

const initialState: GroupStateType = {
  isLoading: false,
  error: undefined,
  groups: persistedState ?? [],
};

const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    setGroups(state, action: PayloadAction<GroupType[]>) {
      state.groups = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllGroups.pending, (state) => {
        debugger
        state.isLoading = true;
      })
      .addCase(fetchAllGroups.fulfilled, (state, action) => {
        debugger
        state.isLoading = false;
        state.groups = action.payload;
      })
      .addCase(fetchAllGroups.rejected, (state, action) => {
        debugger
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addGroupTh.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addGroupTh.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = undefined;
        state.groups = [...state.groups, action.payload];
      })
      .addCase(addGroupTh.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateGroupTh.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateGroupTh.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = undefined;
        const index = state.groups.findIndex(
          (group) => group._id === action.payload._id
        );

        if (index !== -1) {
          state.groups[index] = {
            ...state.groups[index],
            ...action.payload.updatedGroup,
          };
        } else {
          state.groups = [
            ...state.groups,
            { ...action.payload.updatedGroup, _id: action.payload._id },
          ];
        }
      })
      .addCase(updateGroupTh.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteGroupTh.pending, (state) => {
        debugger
        state.isLoading = true;
      })
      .addCase(deleteGroupTh.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = undefined;
        debugger
        console.log(state, action, action.payload, 'state, action, action.payload')
        // @ts-ignore
        console.log(action.payload, 'action.payload in groupSlice')
        state.groups = state.groups.filter(group => group._id !== action.payload._id);
            debugger
      })
      .addCase(deleteGroupTh.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
  },
});

export const { setGroups } = groupsSlice.actions;
export default groupsSlice.reducer;
