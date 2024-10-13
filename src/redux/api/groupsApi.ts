import { AddGroupType, ApiResponse } from "./../types/types";
import axios from "axios";
export const getAllGroups = async () => {
  try {
    const response = await axios.get(`https://ukenback.vercel.app/groups/`);
    //   console.log(response.data, "response.data");
    localStorage.setItem("groups", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addGroup = async (group: AddGroupType): Promise<ApiResponse> => {
  //  console.log('addGroup, API', group)
  try {
    //   console.log('апи 1')

    const response = await axios.post<ApiResponse>(
      `https://ukenback.vercel.app/groups/`,
      group
    );
    //   console.log(response.data, "response.dataб апи2");
    return response.data;
  } catch (error) {
    //    console.log('апи кетч')

    throw error;
  }
};

export const deleteGroup = async (_id: string): Promise<ApiResponse> => {
  try {
    //  console.log('апи 1')

    const response = await axios.delete(
      `https://ukenback.vercel.app/groups/${_id}`
    );

    return response.data;
  } catch (error) {
    //   console.log('апи кетч')

    throw error;
  }
};
