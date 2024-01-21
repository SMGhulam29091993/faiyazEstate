// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAH1rDvl0k-V2XIPGaSqH-seELJ3DkzhUo",
  authDomain: "faiyazestate.firebaseapp.com",
  projectId: "faiyazestate",
  storageBucket: "faiyazestate.appspot.com",
  messagingSenderId: "294288186762",
  appId: "1:294288186762:web:b3f5037a30b25001353c73"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app)