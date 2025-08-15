import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD1mum_W-yKROeF6XZ5Wfs32SINSI9SP9c",
  authDomain: "wiremit-cfbb8.firebaseapp.com",
  projectId: "wiremit-cfbb8",
  storageBucket: "wiremit-cfbb8.firebasestorage.app",
  messagingSenderId: "1069147094459",
  appId: "1:1069147094459:web:9eb92ef2ddc5d817f2189e",
  measurementId: "G-9ZRJ6CMTP0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);