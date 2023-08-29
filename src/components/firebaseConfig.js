import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDPCiN5nshQAZH94oYPTvw6Vg9wRJPw6CA",
  authDomain: "koheva-quiz-8e4d4.firebaseapp.com",
  projectId: "koheva-quiz-8e4d4",
  storageBucket: "koheva-quiz-8e4d4.appspot.com",
  messagingSenderId: "738454897301",
  appId: "1:738454897301:web:bedc153b28bc5f0699519c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { app, firestore };
