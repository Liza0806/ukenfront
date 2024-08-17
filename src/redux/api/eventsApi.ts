import axios from "axios";

export const getAllEvents = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3201/events/`
      );
      console.log(response.data, "response.data");
      localStorage.setItem('events', JSON.stringify(response.data))
      return response.data;
    } catch (error) {
      throw error;
    }
  };