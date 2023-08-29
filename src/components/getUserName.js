import React, { useState } from "react";
import "../css/getUserName.css";
import "animate.css";

import { Radio, Select, Space, Input } from "antd";

function GetUserName(props) {
  const [name, setName] = useState("");
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

    props.parentCallback(name, phone, 25);
  };

  const handleChange = (e, l) => {
    console.log("value", e, l);
    setName(l.label);
    var s = document.getElementById("start");
    s.focus();
    // setName(l.label);
    // handleStepChange("next");
  };

  const options = [
    {
      value: "1",
      label: "AnmoldeepKaur",
    },
    {
      value: "2",
      label: "Kiran Sir",
    },
    {
      value: "3",
      label: "BhumiMa'am",
    },
    {
      value: "4",
      label: "Rahoul",
    },
    {
      value: "5",
      label: "Kevin",
    },
    {
      value: "6",
      label: "Yash",
    },
  ];

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
            options={options}
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
