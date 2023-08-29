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

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Quizpage} />
          <Route path="/winners" Component={WinnerTable} />
          <Route path="/loosers" Component={LooserList} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
