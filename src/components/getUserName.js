import React, { useState } from "react";
import "../css/getUserName.css";
import "animate.css";

import { usersData } from "../data/users";
import { Radio, Select, Space, Input } from "antd";

function GetUserName(props) {
  const [name, setName] = useState("");
  const [id, setID] = useState("");

  const [phone, setPhone] = useState();
  const [isPhoneValid, setIsPhoneValid] = useState(true);
  const [isPhoneEmpty, setIsPhoneEmpty] = useState(true);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [isNameSelected, setIsNameSelected] = useState(false);

  const onTrigger = () => {
    setIsButtonClicked(true);

    if (!isNameSelected || !isPhoneValid || isPhoneEmpty) {
      return; // Don't proceed
    }

    props.parentCallback(name, phone, id);
  };

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
            options={usersData}
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
