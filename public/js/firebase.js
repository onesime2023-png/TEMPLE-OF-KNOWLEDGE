// Firebase web config is public project identification, not a service-account credential.
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import { getFunctions } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-functions.js";
const firebaseConfig = {apiKey:"AIzaSyAmo0cuxCLII1tG-8YMsSBtoMDI3DLHkHM",authDomain:"temple-of-knowledge-17ba0.firebaseapp.com",projectId:"temple-of-knowledge-17ba0",storageBucket: "temple-of-knowledge-17ba0.firebasestorage.app",messagingSenderId: "977778101116", appId:"1:977778101116:web:92e46b4376f053e915b2f9"};
const app=initializeApp(firebaseConfig);
export const auth=getAuth(app), db=getFirestore(app), functions=getFunctions(app,"europe-west1");
