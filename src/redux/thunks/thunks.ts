import { AddGroupArgs, ApiResponse, GroupType } from './../types/types';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { addGroup, getAllGroups } from "../api/groupsApi";
import { getAllEvents } from "../api/eventsApi";
import { group } from "console";

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


export const addGroupTh = createAsyncThunk<ApiResponse, { group: GroupType }>(
  "groups/addGroup",
  async ({ group }, thunkAPI) =>  {
    try {
      const response = await addGroup(group); 
    if (!response) {
      return thunkAPI.rejectWithValue("error");
    }
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue("error");
  }}
)