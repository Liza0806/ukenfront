import axios from "axios";
import { EventTypeDB } from "../types/types";

export const getAllEvents = async () => {
    try {
      const response = await axios.get(
        `https://ukenback.vercel.app/events/`
      );
      console.log(response.data, "response.data");
      localStorage.setItem('events', JSON.stringify(response.data))
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const getEventById = async (id:string) => {
    try {
      const response = await axios.get(
        `https://ukenback.vercel.app/events/${id}`
      );
      console.log(response.data, "response.data");
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const updateEventAPi = async (event: EventTypeDB)=>{
    try {
      const response = await axios.put(
        `https://ukenback.vercel.app/events/${event._id}`,
        event
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  