import axios from "axios";
import  { type IDesignPrompt } from "../interface/interface";
const API_URL = import.meta.env.VITE_API_URL;
export const generateDesign = async (formData: IDesignPrompt) => {
  const response = await axios.post(`${API_URL}/design`, formData);
  return response;
};

  
