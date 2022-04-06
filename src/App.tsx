import React from 'react';
import './App.css';
import { AddGetWord } from './components/AddGetWord';
import 'bootstrap/dist/css/bootstrap.min.css';
import { initializeApp } from 'firebase/app';
import { getFirestore} from "firebase/firestore";
import AddGetDB from "./AddGetDB"

const firebaseConfig = {
  apiKey: "AIzaSyAGjFkvUH9Mq6-riXfOTi6W-uLHhZ8LGE4",
  authDomain: "test20220406-c0538.firebaseapp.com",
  projectId: "test20220406-c0538",
  storageBucket: "test20220406-c0538.appspot.com",
  messagingSenderId: "130647234941",
  appId: "1:130647234941:web:9144d264d5b937009a1414"
};

initializeApp(firebaseConfig);
const defaultFirestore = getFirestore();


const App: React.FC = () => {
  const DB = new AddGetDB(defaultFirestore);
  return (<AddGetWord db={DB}/>);
}

export default App;