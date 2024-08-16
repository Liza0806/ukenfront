
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllGroups } from "../api/groupsApi";


export const fetchAllGroups = createAsyncThunk(
    'groups/fetchAllGroups',
    async (thunkAPI) => {
      const response = await getAllGroups();
      if (!response) {
        return "error"
      }
      return response;
    }
  );