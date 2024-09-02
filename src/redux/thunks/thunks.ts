import { AddGroupType, ApiResponse } from './../types/types';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { addGroup, getAllGroups } from "../api/groupsApi";
import { getAllEvents } from "../api/eventsApi";
import { getAllUsers, getUsersByName } from '../api/usersApi';
import axios from 'axios';


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

export const fetchAllUsers = createAsyncThunk(
  "users/fetchAllUsers",
  async (thunkAPI) => {
    const response = await getAllUsers();
    if (!response) {
      return "error";
    }
    return response;
  }
);

export const fetchUsersByName = createAsyncThunk(
  "users/fetchUsersByName",
  async (username: string, thunkAPI) => {
    console.log('fetchUsersByName1')
    try {
      console.log('fetchUsersByName try')
      const response = await getUsersByName(username);
      return response;
    } catch (error) {
      console.log('fetchUsersByName catch')
      return thunkAPI.rejectWithValue("Failed to fetch users");
    }
  }
);

interface UpdateEventParticipantsPayload {
  eventId: string;
  participants: { _id: string; name: string };
}

// Функция для отправки PUT-запроса на сервер
export const updateEventParticipants = createAsyncThunk(
  'events/updateParticipants',
  async ({ eventId, participants }: UpdateEventParticipantsPayload, thunkAPI) => {
    try {
      const response = await axios.put(
        `https://ukenback.vercel.app/events/${eventId}`,
        { participants }
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


export const addGroupTh = createAsyncThunk
<ApiResponse, 
{ group: AddGroupType },
{ rejectValue: string }
>(
  "groups/addGroup",
  async ({ group }, thunkAPI) =>  {
    console.log('старт санка')

    try {
     console.log('addGroup, TH', group)
      const response = await addGroup(group); 
    if (!response) {
      console.log('в санке не респонс')

        return thunkAPI.rejectWithValue("No response from server");
    }
    if (response.status >= 400) {
      console.log('в санке статус 400 и меньше')

      return thunkAPI.rejectWithValue(response.data);
    }
    return response;
  } catch (error) {
    console.log('кетч у санка')

      return thunkAPI.rejectWithValue("error");
  }}
)