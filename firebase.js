// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8TX6j3oAsdCxIGN3c-oMOuIcgLKsumOY",
  authDomain: "thesis22-23.firebaseapp.com",
  projectId: "thesis22-23",
  storageBucket: "thesis22-23.appspot.com",
  messagingSenderId: "175375579217",
  appId: "1:175375579217:web:834dd754393841111c6070",
  measurementId: "G-FRJ9RHWBNK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export { auth, createUserWithEmailAndPassword };
