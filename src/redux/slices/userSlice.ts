import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserStateType } from "../types/types";
import { fetchAllUsers } from "../thunks/thunks";


const persistedState = localStorage.getItem('users')
  ? JSON.parse(localStorage.getItem('users')!)
  : undefined;

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
    extraReducers: (builder) => {
      builder
        .addCase(fetchAllUsers.pending, (state) => {
          state.isLoading = true;
       //   console.log("pending");
        })
        .addCase(fetchAllUsers.fulfilled, (state, action) => {
          state.isLoading = false;
          state.users = action.payload;
       //   console.log(action.payload);
        })
        .addCase(fetchAllUsers.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload
       //   console.log(action.payload, "error");
        })
        
    },
  });
  
  export const { getUsers, clearUsers } = usersSlice.actions;
  export default usersSlice.reducer;