import React, { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { questionsData } from "./data/questions"; // Update the path accordingly
import Splash from "./components/Splash"; // Update paths for other components
import GetUserName from "./components/getUserName";
import FirstQuestion from "./components/FirstQuestion";
import SecondQuestion from "./components/SecondQuestion";
import ThirdQuestion from "./components/ThirdQuestion";
import FourthQuestion from "./components/FourthQuestion";
import Win from "./components/Win";
import { firestore } from "./components/firebaseConfig";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const totalSteps = 7;
var answerArray = [];
const winners = [];

function App() {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("test");
  const [winners, setWinners] = useState([]);

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
  function handleUpload() {
    if (!winners) {
      alert("Please choose a file first!");
    }

    // const storageRef = ref(storage, `/files/${file.name}`);
  }
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
        const LooserCollecetion = collection(firestore, "loosers");
        setIsWinner(false);
        let looserObj = {
          name: username,
          phone: phoneNumber,
        };
        addDoc(LooserCollecetion, looserObj)
          .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
          })
          .catch((e) => {
            console.error("Error adding document: ", e);
          });
      } else {
        setIsWinner(true);
        let winnerObj = {
          name: username,
          phone: phoneNumber,
        };
        winners.push(winnerObj);

        const winnersCollection = collection(firestore, "winners");

        // Add the winner data to Firestore
        addDoc(winnersCollection, winnerObj)
          .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
          })
          .catch((e) => {
            console.error("Error adding document: ", e);
          });
      }
    }
  };

  const handleStepChange = async (type) => {
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
          que={questionsData[0]}
          step={step}
          name={username}
          handleNextCallback={handleNextCallback}
        />
      )}
      {step === 4 && (
        <SecondQuestion
          que={questionsData[1]}
          step={step}
          handleNextCallback={handleNextCallback}
        />
      )}
      {step === 5 && (
        <ThirdQuestion
          que={questionsData[2]}
          step={step}
          handleNextCallback={handleNextCallback}
        />
      )}
      {step === 6 && (
        <FourthQuestion
          que={questionsData[3]}
          step={step}
          handleNextCallback={handleNextCallback}
        />
      )}
      {step === 7 && <Win isWinner={isWinner} />}
    </>
  );
}

export default App;
