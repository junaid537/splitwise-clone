import { atom } from "recoil";


export const userState = atom({
  key: "login",
  default: {name:"",email:""}, //this is 'role' default value
});