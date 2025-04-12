import axios from "axios";
import { IResource } from "../interface/interface";
const API_URL=import.meta.env.VITE_API_URL
export const createResource=async(formData:IResource)=>{
    const response=await axios.post(`${API_URL}/resource`,formData);
    return response.data
}
export const getResources=async(page:number,limit:number)=>{
    const response=await axios.get(`${API_URL}/resource`,{
        params:{
            page,limit
        }
    });
    return response.data
}

export const updateResource = async(resourceData:IResource)=>{
    const response=await axios.put(`${API_URL}/resource`,resourceData);
    return response.data
}
export const deleteResource = async(id:string)=>{
    const response = await axios.delete(`${API_URL}/resource/${id}`);
    return response.data
}

// createBed
export const createBed = async(bedData: any)=>{
    const response=await axios.post(`${API_URL}/beds/add`,bedData);
    return response.data
}
