import React, { useState, useEffect } from "react";
import "../css/getUserName.css";
import "animate.css";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "./firebaseConfig";
import { usersData } from "../data/users";
import { Radio, Select, Space, Input } from "antd";

function GetUserName(props) {
  const [name, setName] = useState("");
  const [id, setID] = useState("");
  const [filteredNameList, setFilteredNameList] = useState([]);
  const [phone, setPhone] = useState();
  const [isPhoneValid, setIsPhoneValid] = useState(true);
  const [isPhoneEmpty, setIsPhoneEmpty] = useState(true);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [isNameSelected, setIsNameSelected] = useState(false);
  const [loosers, setLoosers] = useState([]);
  const [usersApi, setUsersApi] = useState([]);
  const onTrigger = () => {
    setIsButtonClicked(true);

    if (!isNameSelected || !isPhoneValid || isPhoneEmpty) {
      return; // Don't proceed
    }

    props.parentCallback(name, phone, id);
  };
  const [winners, setWinners] = useState([]);
  console.log(filteredNameList, "filteredNameList");
  useEffect(() => {
    const fetchusers = async () => {
      const usersCollection = collection(firestore, "users");
      const querySnapshot = await getDocs(usersCollection);
      console.log(querySnapshot.docs, usersCollection, "usersCollection");
      const userData = querySnapshot.docs.map((doc, index) => {
        const data = doc.data();
        console.log(doc.id, "id query");
        return { ...data, value: index + 1, label: data.name, id: doc.id };
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

  return (
    <div>
      <div className="contact-form margin-top animate__animated animate__fadeIn">
        <h2>Let's start</h2>
        <div>
          <p className="mt-2">Your Name</p>
          <Select
            showSearch
            style={{
              width: "100%",
            }}
            placeholder="Search to Select"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            onChange={(e, l) => {
              handleChange(e, l);
              setIsNameSelected(true);
            }}
            options={filteredNameList}
            // className={isButtonClicked && !isNameSelected ? "" : "invalid"}
          />
          {isButtonClicked && !isNameSelected && (
            <p className="error-message">*Please select your name.</p>
          )}
          <p className="mt-2">Mobile No.</p>
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
            // disabled={isPhoneEmpty || !isPhoneValid || !isNameSelected}
          />
        </div>
      </div>
    </div>
  );
}

export default GetUserName;
