// Firebase web config is public project identification, not a service-account credential.
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import { getFunctions } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-functions.js";
const firebaseConfig = {apiKey:"REPLACE_ME",authDomain:"REPLACE_ME.firebaseapp.com",projectId:"REPLACE_ME",appId:"REPLACE_ME"};
const app=initializeApp(firebaseConfig);
export const auth=getAuth(app), db=getFirestore(app), functions=getFunctions(app,"europe-west1");
