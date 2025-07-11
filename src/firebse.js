import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // 👈 ye zaroori hai
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC73yXto3pxNFCMvnOZ83uZxs09o3FxBfg",
  authDomain: "codeforbharat-e9216.firebaseapp.com",
  projectId: "codeforbharat-e9216",
  storageBucket: "codeforbharat-e9216.firebasestorage.app",
  messagingSenderId: "215896061890",
  appId: "1:215896061890:web:e7679a07b4a07ed47f885b",
  measurementId: "G-3YE72T1R5X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);