import React, { useState, useEffect } from "react";
import { Progress, Space } from "antd";

import FirstQuestion from "./FirstQuestion";
import SecondQuestion from "./SecondQuestion";
import ThirdQuestion from "./ThirdQuestion";
import FourthQuestion from "./FourthQuestion";
import Splash from "./Splash";
import GetUserName from "./getUserName";
import Win from "./Win";
import Looser from "./Looser";
import { questionsData } from "../data/questions";

import { firestore } from "./firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

import "bootstrap/dist/css/bootstrap.min.css";

const totalSteps = 7;
var answerArray = [];

function Quizpage() {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("test");
  const [id, setID] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [isWinner, setIsWinner] = useState(false);
  const handleCallback = (childData, number, id) => {
    // console.log(childData, number);
    setUsername(childData);
    setPhoneNumber(number);
    setID(id);
    setStep(step + 1);
  };

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
          id: id,
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
          id: id,
        };

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

export default Quizpage;
