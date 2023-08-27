import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBC2QjfebYkd9KO4RSKYZPO0HGI8LHVrmI",
  authDomain: "nuxt-poster-c7328.firebaseapp.com",
  projectId: "nuxt-poster-c7328",
  storageBucket: "nuxt-poster-c7328.appspot.com",
  messagingSenderId: "667784367729",
  appId: "1:667784367729:web:305b8ff07ffcd79244d5d0"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getDatabase();
export default (context) => {
  const config = {
    app: app,
    auth: auth,
    db: database
  }
  context.$firebase = config
} 