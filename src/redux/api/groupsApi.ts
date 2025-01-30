import { AddGroupType } from "./../types/types";
import axios from "axios";

export const getAllGroups = async () => {
   
  try {
     
    const response = await axios.get(`https://ukenback.vercel.app/groups/`);
  //  const response = await axios.get(`/groups/`);
     
    //   console.log(response.data, "response.data");
    localStorage.setItem("groups", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addGroup = async (group: AddGroupType) => {
  try {
    const response = await axios.post(`https://ukenback.vercel.app/groups/`, group);
   // const response = await axios.post(`/groups/`, group);

 
    return response;
  } catch (error) {
     
    throw error; // обработка ошибок в вызывающем коде
  }
};

export const deleteGroup = async (_id: string) => {
  try {
    //  console.log('апи 1')
 
    const response = await axios.delete(`https://ukenback.vercel.app/groups/${_id}`);
 //   const response = await axios.delete(`/groups/${_id}`);

    //  
    return response;
  } catch (error) {
    //   console.log('апи кетч')
 
    throw error;
  }
};
export const updateGroup = async (group: AddGroupType, _id: string) => {
  
  try {
     
     const response = await axios.put(`https://ukenback.vercel.app/groups/${_id}`,group);
   // const response = await axios.put(`/groups/${_id}`,group);
     
    return response.data;
  } catch (error) {
     
    throw error; // обработка ошибок в вызывающем коде
  }
};
