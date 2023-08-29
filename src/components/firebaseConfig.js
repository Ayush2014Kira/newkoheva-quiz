import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgjvHdlJNcsOJbAhUoHJZt0PPOgh4he3w",
  authDomain: "koheva-quiz.firebaseapp.com",
  projectId: "koheva-quiz",
  storageBucket: "koheva-quiz.appspot.com",
  messagingSenderId: "209021207198",
  appId: "1:209021207198:web:d5b786f7d81cc7a744318f",
  measurementId: "G-YCB1Y8SXX1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { app, firestore };
