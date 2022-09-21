import axios from "axios";
//import { useRole } from "../store/roleState";

export const getGroups = async ({ queryKey }) => {
    const  {data}  = await axios.get(
      `http://localhost:3000/api/v1/group/`,{
      headers: {
        Authorization:localStorage.getItem("google-token-popup-feature")?("Bearer " + localStorage.getItem("google-token-popup-feature")):"",
  
      }
    }
  );
  return data;
};


export const getMembersOfAGroup=async ({ queryKey })=>{
    const {data}=await axios.get(
        `http://localhost:3000/api/v1/group/${queryKey[1]}`,
        {
            headers: {
              Authorization:localStorage.getItem("google-token-popup-feature")?("Bearer " + localStorage.getItem("google-token-popup-feature")):"",
        
            }
          }
    );
    return data;

}



export const getOwesOfAGroup=async ({ queryKey })=>{
  const {data}=await axios.get(
      `http://localhost:3000/api/v1/owe/${queryKey[1]}`,
      {
          headers: {
            Authorization:localStorage.getItem("google-token-popup-feature")?("Bearer " + localStorage.getItem("google-token-popup-feature")):"",
      
          }
      }
  );
  return data;

}