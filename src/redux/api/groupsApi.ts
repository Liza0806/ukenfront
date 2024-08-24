import axios from "axios";

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