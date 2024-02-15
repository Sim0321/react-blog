import { initializeApp, FirebaseApp, getApp } from "firebase/app";
import "firebase/auth";

// 지역변수로 선언후 try,catch로 할당
export let app: FirebaseApp;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMATIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENTER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

try {
  app = getApp("app");
} catch (error) {
  app = initializeApp(firebaseConfig, "app");
}

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase;
