import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllGroups } from "../api/groupsApi";
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
