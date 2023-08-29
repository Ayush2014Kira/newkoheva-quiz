import "./App.css";
import React, { useState, useEffect } from "react";
import { Progress, Space } from "antd";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FirstQuestion from "./components/FirstQuestion";
import SecondQuestion from "./components/SecondQuestion";
import ThirdQuestion from "./components/ThirdQuestion";
import FourthQuestion from "./components/FourthQuestion";
import Splash from "./components/Splash";
import GetUserName from "./components/getUserName";
import Win from "./components/Win";
import Looser from "./components/Looser";
import { questionsData } from "../src/data/questions";

import { firestore } from "./components/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

import "bootstrap/dist/css/bootstrap.min.css";
import Quizpage from "./components/quiz";
import WinnerTable from "./components/Winner";
import LooserList from "./components/lose";
import { usersData } from "./data/users";

// const winnersCollection = collection(firestore, "users");
// for (let index = 0; index < usersData.length; index++) {
//   const obj = {
//     name: usersData[index].label,
//   };

//   // Add the winner data to Firestore
//   addDoc(winnersCollection, obj)
//     .then((docRef) => {
//       console.log("Document written with ID: ", docRef.id);
//     })
//     .catch((e) => {
//       console.error("Error adding document: ", e);
//     });
// }
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Quizpage} />
          <Route path="/lucky" Component={WinnerTable} />
          <Route path="/unlucky" Component={LooserList} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
