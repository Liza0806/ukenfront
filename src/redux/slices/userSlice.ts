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
      clearUsers(state) {
        state.users = [];
      },
    },

  });
  
  export const { getUsers, clearUsers } = usersSlice.actions;
  export default usersSlice.reducer;