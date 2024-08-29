import { ApiResponse, GroupStateType, GroupType } from './../types/types';
import axios from "axios";
import { Request, Response } from 'express'; 
export const getAllGroups = async () => {
    try {
      const response = await axios.get(
        `https://ukenback.vercel.app/groups/`
      );
      console.log(response.data, "response.data");
      localStorage.setItem('groups', JSON.stringify(response.data))
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const addGroup = async (group: GroupType): Promise<ApiResponse>  => {
    
    try {
      const response = await axios.post<ApiResponse>(
        `https://ukenback.vercel.app/groups/`,  group
      );
      console.log(response.data, "response.data");
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  