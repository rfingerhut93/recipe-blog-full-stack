import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASFsDp6kIf1T_zmbp58gsuvUiHSFdNZzA",
  authDomain: "recipe-blog-d1b4f.firebaseapp.com",
  projectId: "recipe-blog-d1b4f",
  storageBucket: "recipe-blog-d1b4f.appspot.com",
  messagingSenderId: "289714304046",
  appId: "1:289714304046:web:73370e10d1d151158c9bbf",
  measurementId: "G-0N4181MG13"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();

