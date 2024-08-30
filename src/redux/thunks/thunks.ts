import { AddGroupType, ApiResponse } from './../types/types';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { addGroup, getAllGroups } from "../api/groupsApi";
import { getAllEvents } from "../api/eventsApi";


export const fetchAllGroups = createAsyncThunk(
  "groups/fetchAllGroups",
  async (thunkAPI) => {
    const response = await getAllGroups();
    if (!response) {
      return "error";
    }
    return response;
  }
);

export const fetchAllEvents = createAsyncThunk(
  "events/fetchAllEvents",
  async (thunkAPI) => {
    const response = await getAllEvents();
    if (!response) {
      return "error";
    }
    return response;
  }
);


export const addGroupTh = createAsyncThunk
<ApiResponse, 
{ group: AddGroupType },
{ rejectValue: string }
>(
  "groups/addGroup",
  async ({ group }, thunkAPI) =>  {
    try {
  //    console.log('addGroup, TH', group)
      const response = await addGroup(group); 
    if (!response) {
        return thunkAPI.rejectWithValue("No response from server");
    }
    if (response.status >= 400) {
      return thunkAPI.rejectWithValue(response.data);
    }
    return response;
  } catch (error) {
      return thunkAPI.rejectWithValue("error");
  }}
)