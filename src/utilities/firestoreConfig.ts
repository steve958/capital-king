// firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAn5yVN2qPcOBURel0zuVnJLTkNG8zDm94",
    authDomain: "capital-king-8f73c.firebaseapp.com",
    projectId: "capital-king-8f73c",
    storageBucket: "capital-king-8f73c.firebasestorage.app",
    messagingSenderId: "859075812721",
    appId: "1:859075812721:web:af9582680271be96fcaad0",
    measurementId: "G-XX9KXCG9TT"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
