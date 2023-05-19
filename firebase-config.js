// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
import { getAuth } from "@firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyA8PaQC5ES3Q9QR2QIizrGxOwQ9B8mJAo8",
  authDomain: "thesis-login-1665a.firebaseapp.com",
  projectId: "thesis-login-1665a",
  storageBucket: "thesis-login-1665a.appspot.com",
  messagingSenderId: "610237096038",
  appId: "1:610237096038:web:eb9e16e5172f8f73fe4da7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
