import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


// Replace with your own Firebase configuration
const firebaseConfig = {
    // ... ваш Firebase config 
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional

    

}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.provide('firestore', db);
});

/*dont ask */
