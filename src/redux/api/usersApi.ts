import axios from "axios";
import { User } from "../types/types";

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`https://ukenback.vercel.app/users/`);
    console.log(response.data, "response.data in getAllUsers");
    localStorage.setItem("users", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUsersByName = async (username: string) => {
  console.log("getUsersByName1");
  try {
    console.log("getUsersByName try");
    const response = await axios.get(
      `https://ukenback.vercel.app/users/search`,
      { params: { name: username } }
    );
    console.log(
      response.data,
      "response.data  console.log('getUsersByName try')"
    );
    localStorage.setItem("users", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.log("getUsersByName catch");
    throw error;
  }
};

export const getUsersByUserId = async (userId: string) => {
  //console.log('getUsersByUserId');
  try {
    // console.log('getUsersByUserId try');
    const response = await axios.get(
      `https://ukenback.vercel.app/users/${userId}`
    );

    //  console.log(response.data, "response.data");
    localStorage.setItem("user", JSON.stringify(response.data));

    return response.data;
  } catch (error) {
    //  console.log('getUsersByUserId catch');
    throw error;
  }
};

export const addParticipant = async (username: string, id: string) => {
  console.log("addParticipant");
  try {
    console.log("addParticipant try");
    const response = await axios.put(`https://ukenback.vercel.app/event/`, {
      params: { name: username, id: id },
    });
    console.log(
      response.data,
      "response.data  console.log('getUsersByName try')"
    );
    localStorage.setItem("users", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.log("getUsersByName catch");
    throw error;
  }
};
