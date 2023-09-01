import React, { useState, useEffect } from "react";
import "../css/getUserName.css";
import "animate.css";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { firestore } from "./firebaseConfig";
import { usersData } from "../data/users";
import { Radio, Select, Space, Input } from "antd";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function GetUserName(props) {
  const [name, setName] = useState("");
  const [id, setID] = useState("");
  const [filteredNameList, setFilteredNameList] = useState([]);
  const [phone, setPhone] = useState();
  const [isPhoneValid, setIsPhoneValid] = useState(true);
  const [isPhoneEmpty, setIsPhoneEmpty] = useState(true);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [isNameEmpty, setIsNameEmpty] = useState(true);
  const [loosers, setLoosers] = useState([]);
  const [usersApi, setUsersApi] = useState([]);
  const [isRegistered, setisRegistered] = useState(true);

  const onTrigger = () => {
    setIsButtonClicked(true);

    if (isNameEmpty || !isPhoneValid || isPhoneEmpty) {
      return; // Don't proceed
    }

    let existingUser = usersApi.find((user) => user.phone === phone);
    if (existingUser === undefined && existingUser !== null) {
      addUser();
      props.parentCallback(name, phone);
    } else {
      console.log("existingUser", existingUser);
      // toast("User already played with this number!");
      toast.error("User already played with this number!");
    }
  };

  const addUser = () => {
    let userObj = {
      name: name,
      phone: phone,
    };

    const userCollection = collection(firestore, "users");

    addDoc(userCollection, userObj)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        usersApi.push(userObj);
      })
      .catch((e) => {
        console.error("Error adding document: ", e);
      });
  };
  const [winners, setWinners] = useState([]);
  console.log(filteredNameList, "filteredNameList");
  const fetchusers = async () => {
    const usersCollection = collection(firestore, "users");
    const querySnapshot = await getDocs(usersCollection);
    console.log(querySnapshot.docs, usersCollection, "usersCollection");
    const userData = querySnapshot.docs.map((doc, index) => {
      const data = doc.data();
      console.log(doc.id, "id query");
      return { ...data };
    });
    setUsersApi(userData);
  };
  const fetchWinners = async () => {
    const winnersCollection = collection(firestore, "winners");
    const querySnapshot = await getDocs(winnersCollection);
    const winnersData = querySnapshot.docs.map((doc, index) => {
      const data = doc.data();
      return { ...data, index: index + 1 };
    });
    setWinners(winnersData);
  };
  const fetchLooser = async () => {
    const winnersCollection = collection(firestore, "loosers");

    const querySnapshot = await getDocs(winnersCollection);
    const loosersData = querySnapshot.docs.map((doc, index) => {
      const data = doc.data();
      return { ...data, index: index + 1 };
    });
    setLoosers(loosersData);
  };
  useEffect(() => {
    fetchusers();
    fetchWinners();
    fetchLooser();
  }, []);
  // const difference = [];
  console.log(usersApi, "usersApi");
  useEffect(() => {
    const mergerdusers = [...loosers, ...winners];

    const difference = usersApi.filter(
      (x) => !mergerdusers.find((rm) => rm.id === x.id)
    );

    console.log(winners, loosers, "winners");
    console.log(difference, "difference");

    setFilteredNameList(difference);
  }, [winners, loosers]);

  const handleChange = (e, l) => {
    console.log("value", e, l);
    setName(l.label);
    setID(l.id);
    var s = document.getElementById("start");
    s.focus();
    // setName(l.label);
    // handleStepChange("next");
  };

  const validatePhone = () => {
    const phonePattern = /^[0-9]{10}$/; // Adjust as needed
    setIsPhoneValid(phonePattern.test(phone));
    setIsPhoneEmpty(phone === "");
  };
  const validateName = () => {
    const phonePattern = /^[0-9]{10}$/; // Adjust as needed
    // setIsPhoneValid(phonePattern.test(phone));
    setIsNameEmpty(name === "");
  };

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="contact-form margin-top animate__animated animate__fadeIn">
        <h2>Let's start</h2>
        <div>
          <p className="mt-2">Your Name *</p>
          <Input
            type="text"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setIsNameEmpty(e.target.value === "");
            }}
            onBlur={validateName}
            className={!isNameEmpty ? "" : "invalid"}
            required
            // className={isButtonClicked && !isNameSelected ? "" : "invalid"}
          />
          {isButtonClicked && isNameEmpty && (
            <p className="error-message">*Please Enter your name.</p>
          )}
          <p className="mt-2">Mobile No. *</p>
          <Input
            placeholder="Enter Your Phone"
            type="number"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setIsPhoneEmpty(e.target.value === "");
            }}
            onBlur={validatePhone}
            className={isPhoneValid || isPhoneEmpty ? "" : "invalid"}
            required
          />
          {isButtonClicked && isPhoneEmpty && (
            <p className="error-message">*Please enter a phone number.</p>
          )}
          {isButtonClicked && !isPhoneValid && (
            <p className="error-message">*Please enter a valid phone number.</p>
          )}
          <input
            type="button"
            id="start"
            value="START"
            onClick={() => onTrigger()}
          />
        </div>
      </div>
    </div>
  );
}

export default GetUserName;
