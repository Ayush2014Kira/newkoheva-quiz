import React from "react";
import logo from "../image/image2.png";
import "animate.css";
import "../css/splash.css";

export default function Splash() {
  localStorage.clear();
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
