import "./App.css";
import React, { useState, useEffect } from "react";
import { Progress, Space } from "antd";

import FirstQuestion from "./components/FirstQuestion";
import SecondQuestion from "./components/SecondQuestion";
import ThirdQuestion from "./components/ThirdQuestion";
import FourthQuestion from "./components/FourthQuestion";
import Splash from "./components/Splash";
import GetUserName from "./components/getUserName";
import Win from "./components/Win";
import Looser from "./components/Looser";

import "bootstrap/dist/css/bootstrap.min.css";
import CProcress from "./components/procress";
import "../node_modules/@syncfusion/ej2-calendars/styles/material.css";
import "../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../node_modules/@syncfusion/ej2-buttons/styles/material.css";
import "../node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
import "../node_modules/@syncfusion/ej2-inputs/styles/material.css";
import "../node_modules/@syncfusion/ej2-navigations/styles/material.css";
import "../node_modules/@syncfusion/ej2-popups/styles/material.css";
import "../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";
import "../node_modules/@syncfusion/ej2-react-grids/styles/material.css";
const quiz = [
  {
    question: " Which One is Koheva Product & not Juice?",
    choice1: "Option A",
    choice2: "Option B",
    answer: "Option B",
  },
  {
    question: "Which One is Koheva Product & not Juice?",
    choice1: "Option A",
    choice2: "Option B",
    answer: "Option B",
  },
  {
    question: "Which One is Koheva Product & not Juice?",
    choice1: "Option A",
    choice2: "Option B",
    answer: "Option B",
  },
  {
    question: "Which One is Koheva Product & not Juice?",
    choice1: "Option A",
    choice2: "Option B",
    answer: "Option B",
  },
];

const totalSteps = 7;
var answerArray = [];

function App() {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("test");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isWinner, setIsWinner] = useState(false);
  const [pr, setpr] = useState(0);
  const handleCallback = (childData, number, prox) => {
    console.log(prox, "prosss");
    // console.log(childData, number);
    setUsername(childData);
    setPhoneNumber(number);
    setpr(prox + pr);

    setStep(step + 1);
  };

  useEffect(() => {
    console.log(pr, "ayu");
  }, [pr]);
  const handleNextCallback = (childData, prox) => {
    answerArray.push(childData.isChoiceCorrect);
    setStep(childData.step + 1);
    console.log("answerArray", answerArray);
    console.log("STEP", step);

    if (step === 6) {
      if (answerArray.includes(false)) {
        setIsWinner(false);
      } else {
        setIsWinner(true);
      }
    }
  };

  const handleStepChange = (type) => {
    if (step === totalSteps && type === "next") {
      return alert("You have already completed the last step");
    }
    if (type === "next") {
      if (step < totalSteps) {
        setStep(step + 1);
      }
    }
  };

  useEffect(() => {
    if (step == 1) {
      setTimeout(() => {
        setStep(step + 1);
      }, 6500);
    }
  }, []);

  return (
    <>
      <Splash />
      {/* <Progress strokeLinecap="butt" percent={} /> */}
      {/* {step === 1 && <Splash handleStepChange={handleStepChange} />} */}
      {step === 2 && (
        <GetUserName
          handleStepChange={handleStepChange}
          parentCallback={handleCallback}
        />
      )}{" "}
      {step === 3 && (
        <FirstQuestion
          que={quiz[0]}
          step={step}
          name={username}
          handleNextCallback={handleNextCallback}
        />
      )}
      {step === 4 && (
        <SecondQuestion
          que={quiz[1]}
          step={step}
          handleNextCallback={handleNextCallback}
        />
      )}
      {step === 5 && (
        <ThirdQuestion
          que={quiz[2]}
          step={step}
          handleNextCallback={handleNextCallback}
        />
      )}
      {step === 6 && (
        <FourthQuestion
          que={quiz[3]}
          step={step}
          handleNextCallback={handleNextCallback}
        />
      )}
      {step === 7 && <Win isWinner={isWinner} />}
    </>
  );
}

export default App;
