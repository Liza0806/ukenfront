import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserStateType } from "../types/types";


const persistedState = localStorage.getItem('users')
  ? JSON.parse(localStorage.getItem('users')!)
  : undefined;

const initialState: UserStateType = {
  isLoading: false,
  error: undefined,
  users: persistedState ?? [],
  
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