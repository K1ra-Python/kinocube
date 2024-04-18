// plugins/firebase.js

import { initializeApp } from 'firebase/app';
import firebaseConfig from '~/firebase-config';

// Инициализируем Firebase только один раз
export default defineNuxtPlugin(nuxtApp => {
    const firebaseApp = initializeApp(firebaseConfig);
    nuxtApp.provide('firebaseApp',firebaseApp);
})




