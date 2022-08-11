import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAYDdHiTEFyS1NRv14f-mElNJoRo3UTUQI",
    authDomain: "dochoiviet-b46cd.firebaseapp.com",
    projectId: "dochoiviet-b46cd",
    storageBucket: "dochoiviet-b46cd.appspot.com",
    messagingSenderId: "135963666152",
    appId: "1:135963666152:web:eba62b8c97cb91496d0b5d"
};

export const firebaseApp = initializeApp(firebaseConfig);

export const storage = getStorage(firebaseApp);