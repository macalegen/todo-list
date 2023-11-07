import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA5tyCeAz40XTc3DUQwI9Pg-XQXkeVCvXI",
  authDomain: "todo-list-9fbb5.firebaseapp.com",
  projectId: "todo-list-9fbb5",
  storageBucket: "todo-list-9fbb5.appspot.com",
  messagingSenderId: "99603926470",
  appId: "1:99603926470:web:4d83bf8aeb26e57f28b6c7",
  databaseURL:
    "https://todoproject-f6545-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
