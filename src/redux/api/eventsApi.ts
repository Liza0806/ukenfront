import axios from "axios";
import { EventTypeDB } from "../types/types";
import { group } from "console";

export const getAllEvents = async () => {
   
    try {
    //  const response = await axios.get(`/events/`);

      const response = await axios.get(`https://ukenback.vercel.app/events/`);
   // const response = await axios.get(`/events/`);
       
   //   console.log(response.data, "response.data");
     // localStorage.setItem('events', JSON.stringify(response.data))
      return response.data;
    } catch (error) {
       
      throw error;
    }
  };

  export const getEventById = async (id:string) => {
    try {
    // const response = await axios.get(`/events/${id}`);    

      const response = await axios.get(`https://ukenback.vercel.app/events/${id}`);    
   // const response = await axios.get(`/events/${id}`); 
    // //  console.log(response.data, "response.data");
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const updateEventAPi = async (event: EventTypeDB)=>{
    try {
      console.log(event, 'event in updateEventAPi')
    //  const response = await axios.put(`/events/${event._id}`, {_id: event._id, date: event.date, groupId: event.groupId, groupTitle: event.groupTitle, isCancelled: event.isCancelled, participants: event.participants});
      const response = await axios.put(`https://ukenback.vercel.app/events/${event._id}`, {_id: event._id, date: event.date, groupId: event.groupId, groupTitle: event.groupTitle, isCancelled: event.isCancelled, participants: event.participants});
     // const response = await axios.put(`/events/${event._id}`, {_id: event._id, date: event.date, groupId: event.groupId, groupTitle: event.groupTitle, isCancelled: event.isCancelled, participants: event.participants});

      return response.data;
    } catch (error) {
      throw error;
    }
  }
 