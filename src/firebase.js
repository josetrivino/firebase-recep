import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB5XrZBw8gEaCcXJ6Y9w8C_pBIl4M9oFhY",
  authDomain: "fir-recep.firebaseapp.com",
  projectId: "fir-recep",
  storageBucket: "fir-recep.appspot.com",
  messagingSenderId: "494611913459",
  appId: "1:494611913459:web:4a6ef2a59e56bb0a50f586",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
