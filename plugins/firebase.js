import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


// Replace with your own Firebase configuration
const firebaseConfig = {
    // ... ваш Firebase config 
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional

    apiKey: "AIzaSyBitsjuGgHcwkh347w8F8YdmdKrL0zRFo8",
    authDomain: "kinocube-8ac50.firebaseapp.com",
    projectId: "kinocube-8ac50",
    storageBucket: "kinocube-8ac50.appspot.com",
    messagingSenderId: "1042756316645",
    appId: "1:1042756316645:web:827b3da0e20f37349c130c",
    measurementId: "G-PWZRSMGCQR"

}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.provide('firestore', db);
});