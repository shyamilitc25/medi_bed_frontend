import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

// getbed data

export const getBeds = async (page: number, limit: number) => {
  try {
    const response = await axios.get(`${API_URL}/beds`, {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching beds:", error);
    throw error;
  }
};
// createBed
export const createBed = async (bedData: any) => {
  const response = await axios.post(`${API_URL}/beds/add`, bedData);
  return response.data;
};
