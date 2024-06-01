import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDCTG1EklEuydU5_Aphd2U2tNNNhkmkszw",
  authDomain: "swp391-91e87.firebaseapp.com",
  projectId: "swp391-91e87",
  storageBucket: "swp391-91e87.appspot.com",
  messagingSenderId: "610030979816",
  appId: "1:610030979816:web:bb3e29b4b4813cbbfbd75d",
  measurementId: "G-F9LQ5LGQSS",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
