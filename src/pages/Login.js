import React from "react";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { userState } from "../store/user";
import { Button } from "antd";


export function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useRecoilState(userState);
  
  useEffect(()=>{

  },[user])
  
  console.log("hello");
  //console.log("times",roleData);

  async function googleLogin() {
    //1 - init Google Auth Provider
    const provider = new GoogleAuthProvider();
    
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = await auth.currentUser?.getIdTokenResult();
        console.log("credentials", credential.token);
        const token = credential.token;
        localStorage.setItem("google-token-popup-feature", token);
        // The signed-in user info.
        const user = result.user;
        await alert("Authentication Sucessful", user.emailVerified);
        console.log("user", user);
        console.log("result by jun", result.user.email);
        setUser({name:result.user.displayName,email:result.user.email})
      
          navigate("/dashboard")
 
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
      //console.log('role',role);
  }
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop:"300px"
        }}
      >
        <Button
          type="primary"
          onClick={() => {
            googleLogin();
          }}
        >
          Login To Continue
        </Button>
      </div>

    </>
  );
}
