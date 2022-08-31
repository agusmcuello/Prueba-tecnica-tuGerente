import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDT3emBO_gSmtbq2ur8xwbgZ5JLoNcnf1Q",
    authDomain: "fir-app-47d4e.firebaseapp.com",
    projectId: "fir-app-47d4e",
    storageBucket: "fir-app-47d4e.appspot.com",
    messagingSenderId: "1010600460753",
    appId: "1:1010600460753:web:ef4bfd7b51ac3b8faea0f0"
  };

  const firebaseApp = initializeApp(firebaseConfig);

  export default firebaseApp;