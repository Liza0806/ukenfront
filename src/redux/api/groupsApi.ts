import axios from "axios";

export const getAllGroups = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3201/groups/`
      );
      console.log(response.data, "response.data");
      localStorage.setItem('pokemons', JSON.stringify(response.data))
      return response.data;
    } catch (error) {
      throw error;
    }
  };