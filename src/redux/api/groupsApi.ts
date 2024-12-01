import { AddGroupType } from "./../types/types";
import axios from "axios";

export const getAllGroups = async () => {
  debugger
  try {
    debugger
    const response = await axios.get(`https://ukenback.vercel.app/groups/`);
    debugger
    //   console.log(response.data, "response.data");
    localStorage.setItem("groups", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addGroup = async (group: AddGroupType) => {
  try {
    const response = await axios.post(
      `https://ukenback.vercel.app/groups/`,
      group
    );
debugger
    return response;
  } catch (error) {
    debugger
    throw error; // обработка ошибок в вызывающем коде
  }
};

export const deleteGroup = async (_id: string) => {
  try {
    //  console.log('апи 1')
debugger
    const response = await axios.delete(
      `https://ukenback.vercel.app/groups/${_id}`
    );
debugger
    return response;
  } catch (error) {
    //   console.log('апи кетч')
debugger
    throw error;
  }
};
export const updateGroup = async (group: AddGroupType, _id: string) => {
 debugger
  try {
    debugger
    const response = await axios.put(
      `https://ukenback.vercel.app/groups/${_id}`,
      group
    );
    debugger
    return response.data;
  } catch (error) {
    debugger
    throw error; // обработка ошибок в вызывающем коде
  }
};
