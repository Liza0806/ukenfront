import {
  AddGroupType,
  ApiResponse,
  EventTypeDB,
  GroupType,
  User,
} from "./../types/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addGroup,
  deleteGroup,
  getAllGroups,
  updateGroup,
} from "../api/groupsApi";
import { getAllEvents, getEventById, updateEventAPi } from "../api/eventsApi";
import { getAllUsers, getUsersByName } from "../api/usersApi";
import axios from "axios";

export const fetchAllGroups = createAsyncThunk<
  GroupType[], // Тип возвращаемого значения
  void, // Тип аргументов (в данном случае ничего не передается)
  { rejectValue: string } // Тип значения для reject
>("groups/fetchAllGroups", async (_, thunkAPI) => {
  const response = await getAllGroups();
  if (!response) {
    return thunkAPI.rejectWithValue("error");
  }
  return response;
});

export const fetchAllEvents = createAsyncThunk<
  EventTypeDB[], // Тип возвращаемого значения
  void, // Тип аргументов (в данном случае ничего не передается)
  { rejectValue: string } // Тип значения для reject
>("events/fetchAllEvents", async (_, thunkAPI) => {
  const response = await getAllEvents();

  if (!response) {
    console.log("fetchAllEvents");
    return thunkAPI.rejectWithValue("error");
  }
  return response;
});

export const fetchEventById = createAsyncThunk<
  EventTypeDB, // Тип возвращаемого значения
  string, // Тип аргументов
  { rejectValue: string } // Тип значения для reject
>("events/fetchEventById", async (id, thunkAPI) => {
  const response = await getEventById(id);
  if (!response) {
    console.log("fetchEventById");
    return thunkAPI.rejectWithValue("error");
  }
  return response;
});

export const fetchAllUsers = createAsyncThunk<
  User[], // Тип возвращаемого значения
  void, // Тип аргументов (в данном случае ничего не передается)
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
  string, // Тип аргументов
  { rejectValue: string } // Тип значения для reject
>("users/fetchUsersByName", async (username: string, thunkAPI) => {
  const response = await getUsersByName(username);
  if (!response) {
    console.log("fetchUsersByName catch");
    return thunkAPI.rejectWithValue("error");
  }
  return response;
});

interface UpdateEventParticipantsPayload {
  event: EventTypeDB;
}

interface UpdateGroupThPayload {
  group: GroupType;
  _id: string;
}
// Функция для отправки PUT-запроса на сервер
export const updateEvent = createAsyncThunk<
  EventTypeDB, // Тип возвращаемого значения
  UpdateEventParticipantsPayload, // Тип аргументов
  { rejectValue: string } // Тип значения для reject
>(
  "events/updateEvent",
  async ({ event }: UpdateEventParticipantsPayload, thunkAPI) => {
    const response = await updateEventAPi(event);
    if (!response) {
      return thunkAPI.rejectWithValue("error");
    }
    return response;
  }
);

export const addGroupTh = createAsyncThunk<
  GroupType, // Тип данных при успешном выполнении
  AddGroupType, // Тип аргументов, передаваемых в thunk
  { rejectValue: string } // Тип для ошибки
>("groups/addGroupTh", async (group: AddGroupType, thunkAPI) => {
  try {
    const response = await addGroup(group);
    if (response.status && response.status !== 200) {
      return thunkAPI.rejectWithValue("error");
    }

    return response.data; // возвращаемый результат будет типа GroupType
  } catch (error) {
    return thunkAPI.rejectWithValue("error");
  }
});

export const deleteGroupTh = createAsyncThunk<
  GroupType, // Тип данных при успешном выполнении
  string, // Тип аргументов, передаваемых в thunk
  { rejectValue: string } // Тип для ошибки
>("groups/deleteGroupTh", async (_id: string, thunkAPI) => {
  try {
    const response = await deleteGroup(_id);
    //   console.log(response.data);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue("error");
  }
});

export const updateGroupTh = createAsyncThunk<
  GroupType, // Тип возвращаемого значения
  { group: AddGroupType; _id: string }, // Тип аргумента
  { rejectValue: string } // Тип для rejected value
>("groups/updateGroupTh", async ({ group, _id }, thunkAPI) => {
  const response = await updateGroup(group, _id);
  if (!response) {
    return thunkAPI.rejectWithValue("error");
  }
  return response;
});
