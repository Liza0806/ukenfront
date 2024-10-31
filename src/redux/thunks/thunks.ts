import { AddGroupType, ApiResponse, EventTypeDB, GroupType, User } from "./../types/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { addGroup, deleteGroup, getAllGroups } from "../api/groupsApi";
import { getAllEvents, getEventById } from "../api/eventsApi";
import { getAllUsers, getUsersByName } from "../api/usersApi";
import axios from "axios";

export const fetchAllGroups = createAsyncThunk<
GroupType[], // Тип возвращаемого значения
void,                  // Тип аргументов (в данном случае ничего не передается)
{ rejectValue: string } // Тип значения для reject
>(
  "groups/fetchAllGroups",
  async (_, thunkAPI) => {
    const response = await getAllGroups();
    if (!response) {
      return thunkAPI.rejectWithValue("error");
    }
    return response;
  }
);

export const fetchAllEvents = createAsyncThunk<
EventTypeDB[], // Тип возвращаемого значения
void,                  // Тип аргументов (в данном случае ничего не передается)
{ rejectValue: string } // Тип значения для reject
>(
  "events/fetchAllEvents",
  async (_, thunkAPI) => {
    const response = await getAllEvents();
    
    if (!response) {
      console.log("fetchAllEvents");
      return thunkAPI.rejectWithValue("error");
    }
    return response
  }
);



export const fetchEventById = createAsyncThunk<
EventTypeDB, // Тип возвращаемого значения
string,                  // Тип аргументов
{ rejectValue: string } // Тип значения для reject
>(
  "events/fetchEventById",
  async (id, thunkAPI) => {
 
      const response = await getEventById(id);
      if (!response) {
        console.log("fetchEventById");
        return thunkAPI.rejectWithValue("error");
      }
      return response;
  }
);

export const fetchAllUsers = createAsyncThunk<
User[], // Тип возвращаемого значения
void,                  // Тип аргументов (в данном случае ничего не передается)
{ rejectValue: string } // Тип значения для reject
>(
  "users/fetchAllUsers",

      async (_, thunkAPI) => {
    const response = await getAllUsers();
    if (!response) {
      return thunkAPI.rejectWithValue("error");
    }
    return response;
  }
);

export const fetchUsersByName = createAsyncThunk<
User, // Тип возвращаемого значения
string,                  // Тип аргументов 
{ rejectValue: string } // Тип значения для reject
>(
  "users/fetchUsersByName",
  async (username: string, thunkAPI) => {

      const response = await getUsersByName(username);
      if (!response) {

      console.log("fetchUsersByName catch");
      return thunkAPI.rejectWithValue("error");}
    return response;
  }    
);

interface UpdateEventParticipantsPayload {
  event: EventTypeDB;
}

interface UpdateGroupThPayload {
  group: GroupType;
  _id: string;
}
// Функция для отправки PUT-запроса на сервер
export const updateEvent = createAsyncThunk(
  "events/updateEvent",
  async ({ event }: UpdateEventParticipantsPayload, thunkAPI) => {
    try {
      const response = await axios.put(
        `https://ukenback.vercel.app/events/${event._id}`,
        event
      );
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addGroupTh = createAsyncThunk<
  ApiResponse,
  { group: AddGroupType },
  { rejectValue: string }
>("groups/addGroup", async ({ group }, thunkAPI) => {
  // console.log("старт санка");

  try {
    console.log("addGroup, TH", group);
    const response = await addGroup(group);
    if (!response) {
      //  console.log("в санке не респонс");

      return thunkAPI.rejectWithValue("No response from server");
    }
    if (response.status >= 400) {
      // console.log("в санке статус 400 и меньше");

      return thunkAPI.rejectWithValue(response.data);
    }
    return response;
  } catch (error) {
    //   console.log("кетч у санка");

    return thunkAPI.rejectWithValue("error");
  }
});

export const deleteGroupTh = createAsyncThunk(
  "groups/deleteGroupTh",
  async (_id: string, thunkAPI) => {
    try {
      const response = await deleteGroup(_id);
      //   console.log(response.data);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);export const updateGroupTh = createAsyncThunk<
GroupType, // Тип возвращаемого значения
{ group: GroupType; _id: string }, // Тип аргумента
{ rejectValue: string } // Тип для rejected value
>("events/updateEvent", async ({ group, _id }, thunkAPI) => {
console.log(group, 'updateGroupTh');
try {
  const response = await axios.put(
    `https://ukenback.vercel.app/groups/${_id}`,
    group
  );
  console.log(response.data, 'updateGroupTh');
  return response.data; // Возвращаем обновленную группу
} catch (error: any) {
  return thunkAPI.rejectWithValue(error.response.data); // Возвращаем ошибку
}
});