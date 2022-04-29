import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bulma/css/bulma.min.css';
import '../src/styles/css/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCfcnZd-7keqPD1yx1419NxmmniOjYxDMs",
  authDomain: "music-store-firebase.firebaseapp.com",
  projectId: "music-store-firebase",
  storageBucket: "music-store-firebase.appspot.com",
  messagingSenderId: "287530167031",
  appId: "1:287530167031:web:2f8d6107f5ccc1e90901f2",
  measurementId: "G-69HTNVD24H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<React.StrictMode><App /></React.StrictMode>);


reportWebVitals();
