import axios from "axios";
import { User } from "../types/types";

export const getAllUsers = async ():  Promise<User[]> => {
    try {
      const response = await axios.get<User[]>(
        `https://ukenback.vercel.app/users/`
      );
      console.log(response.data, "response.data in getAllUsers");
      localStorage.setItem('users', JSON.stringify(response.data))
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  
export const getUsersByName = async (username:string) => {
  console.log('getUsersByName1')
    try {
      console.log('getUsersByName try')
      const response = await axios.get(
        `https://ukenback.vercel.app/users/search`,
       { params: { name: username }}
      );
      console.log(response.data, "response.data  console.log('getUsersByName try')");
      localStorage.setItem('users', JSON.stringify(response.data))
      return response.data;
    } catch (error) {
      console.log('getUsersByName catch')
      throw error;
    }
  };

  export const getUsersByTelegramId = async (telegramId:number) => {
    console.log('getUsersByTelegramId')
      try {
        console.log('getUsersByTelegramId try')
        const response = await axios.get(
          `https://ukenback.vercel.app/users/${telegramId}`,
         { params: { telegramId: telegramId }}
        );
        console.log(response.data, "response.data  console.log('getUsersByTelegramId try')");
        localStorage.setItem('user', JSON.stringify(response.data))
        return response.data;
      } catch (error) {
        console.log('getUsersByTelegramId catch')
        throw error;
      }
    };
  

  export const addParticipant = async (username:string, id: string) => {
    console.log('addParticipant')
      try {
        console.log('addParticipant try')
        const response = await axios.put(
          `https://ukenback.vercel.app/event/`,
         { params: { name: username, id: id }}
        );
        console.log(response.data, "response.data  console.log('getUsersByName try')");
        localStorage.setItem('users', JSON.stringify(response.data))
        return response.data;
      } catch (error) {
        console.log('getUsersByName catch')
        throw error;
      }
    };
 