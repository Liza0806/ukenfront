import { Payment } from "../types/types";
import axios from "axios";

export const getAllPayments = async () => {
   
  try {
//    const response = await axios.get(`/api/payments/`);

 const response = await axios.get(`https://ukenback.vercel.app/api/payments/`);
  //  const response = await axios.get(`/groups/`);
     
      console.log(response.data, "response.data in getAllPayments");
   // localStorage.setItem("groups", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    throw error;
  }
};