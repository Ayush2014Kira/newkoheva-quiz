import React from "react";
import logo from "../image/logo.png";
import "animate.css";
import "../css/splash.css";

export default function Splash() {
  return (
    <div className="splash_container d-flex flex-row justify-content-center  align-items-center">
      <img
        class="animate__animated animate__zoomIn"
        src={logo}
        width="50%"
      ></img>
    </div>
  );
}
