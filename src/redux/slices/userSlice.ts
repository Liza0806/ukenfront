import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addGroupTh, fetchAllGroups, fetchAllUsers, fetchUsersByName } from "../thunks/thunks";
import { GroupStateType, GroupType, User, UserStateType } from "../types/types";

const initialState: UserStateType = {
  isLoading: false,
  error: undefined,
  users: [],
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
      getUsers(state, action: PayloadAction<User[]>) {
        state.users = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchUsersByName.pending, (state) => {
          state.isLoading = true;
          state.error = undefined;
          console.log("pending");
        })
        .addCase(fetchUsersByName.fulfilled, (state, action: PayloadAction<User[]>) => {
          state.isLoading = false;
          state.users = action.payload;
          console.log(action.payload, "fulfilled");
        })
        .addCase(fetchUsersByName.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload as string;
          console.log(action.payload, "error");
        });
    }
  });
  
  export const { getUsers } = usersSlice.actions;
  export default usersSlice.reducer;