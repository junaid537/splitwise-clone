// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGo0puC6ON-XSPxfMJESSg3u_i96515W8",
  authDomain: "splitwise-5fc8d.firebaseapp.com",
  projectId: "splitwise-5fc8d",
  storageBucket: "splitwise-5fc8d.appspot.com",
  messagingSenderId: "614992079888",
  appId: "1:614992079888:web:36ceadcbf623f7ea432e95",
  measurementId: "G-7T2JFRFF5S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);