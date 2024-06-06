import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBU5q9ZGnqvyrtmAjW_84u76PLTe_mpDXE",
  authDomain: "jss-image.firebaseapp.com",
  projectId: "jss-image",
  storageBucket: "jss-image.appspot.com",
  messagingSenderId: "1035810301175",
  appId: "1:1035810301175:web:fd71877b968dfc679a9ff2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
