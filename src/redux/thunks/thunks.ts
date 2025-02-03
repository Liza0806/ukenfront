import {
  AddEventTypeDB,
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
import { toast } from "react-toastify";

export const fetchAllGroups = createAsyncThunk<
  GroupType[], // Тип возвращаемого значения
  void, // Тип аргументов (в данном случае ничего не передается)
  { rejectValue: string } // Тип значения для reject
>("groups/fetchAllGroups", async (_, thunkAPI) => {
  const response = await getAllGroups();
  console.log(response, "response in fetchAllGroups");
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
    //  console.log("fetchAllEvents");
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
    //  console.log("fetchEventById");
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
    //   console.log("fetchUsersByName catch");
    return thunkAPI.rejectWithValue("error");
  }
  return response;
});

export const updateEvent = createAsyncThunk<
  EventTypeDB, // Тип возвращаемого значения
  AddEventTypeDB, // Тип аргументов
  { rejectValue: string } // Тип значения для reject
>(
  "events/updateEvent",
  async (
    { _id, date, groupId, groupTitle, isCancelled, participants },
    thunkAPI
  ) => {
    console.log("updateEventTH");
    const response = await updateEventAPi({
      _id,
      date,
      groupId,
      groupTitle,
      isCancelled,
      participants,
    });
    if (!response) {
      toast.error("При оновленні тренування виникла помилка");
      return thunkAPI.rejectWithValue("error");
    }
    toast.success("Тренування успішно оновлено");
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
 
    if (response.status >= 200 && response.status < 300) {  
      toast.success('Група успішно додана')
      return response.data; 
    } 
  } catch (error) {
    toast.error('При додаванні групи виникла помилка')
    return thunkAPI.rejectWithValue("error");
  }
});

export const deleteGroupTh = createAsyncThunk<
  {_id: string, message: string}, // Тип данных при успешном выполнении
  string, // Тип аргументов, передаваемых в thunk
  { rejectValue: string } // Тип для ошибки
>("groups/deleteGroupTh", async (_id: string, thunkAPI) => {
  try {
    const response = await deleteGroup(_id);
    toast.success('Група успішно видалена')
    //   console.log(response.data);
    return response.data;
  } catch (error: any) {
    toast.error('При видаленні групи виникла помилка')
    return thunkAPI.rejectWithValue("error");
  }
});


export const updateGroupTh = createAsyncThunk<
  { _id: string; updatedGroup: GroupType }, // Тип возвращаемого значения
  { group: AddGroupType; _id: string }, // Тип аргумента
  { rejectValue: string } // Тип для rejected value
>("groups/updateGroupTh", async ({ group, _id }, thunkAPI) => {
  const response = await updateGroup(
    {
      title: group.title,
      coachId: group.coachId,
      dailyPayment: group.dailyPayment,
      monthlyPayment: group.monthlyPayment,
      schedule: group.schedule,
      participants: group.participants,
    },
    _id
  );
  toast.success("Група успішно оновлена");
  if (!response) {
    const errorMessage =
    response?.data?.message || "При оновленні групи виникла помилка";
  toast.error(errorMessage);
    return thunkAPI.rejectWithValue("error");
  }

  return response;
});
