import React, { useState, useEffect, useRef } from "react";
import "../css/winner.css";
import "../css/confeeti.css";
import $ from "jquery";
import "animate.css";
import congif from "../image/july_shot.gif";
function Win(props) {
  const [animationCompleted, setAnimationCompleted] = useState(true);
  const containerRef = useRef(null);

  const confettiFrequency = 3;
  const confettiColors = [
    "#EF2964",
    "#00C09D",
    "#2D87B0",
    "#48485E",
    "#EFFF1D",
  ];
  const confettiAnimations = ["slow", "medium", "fast"];

  useEffect(() => {
    const setupElements = () => {
      const el = containerRef.current;

      if (el) {
        const elPosition = getComputedStyle(el).position;

        if (elPosition !== "relative" && elPosition !== "absolute") {
          el.style.position = "relative";
        }

        const container = document.createElement("div");
        container.classList.add("confetti-container");
        el.appendChild(container);
      }
    };

    setupElements();
  }, []);

  useEffect(() => {
    const renderConfetti = () => {
      const confettiInterval = setInterval(() => {
        const containerEl = containerRef.current;

        if (!containerEl) return;

        const confettiEl = document.createElement("div");
        const confettiSize = Math.floor(Math.random() * 3) + 7 + "px";
        const confettiBackground =
          confettiColors[Math.floor(Math.random() * confettiColors.length)];
        const confettiLeft =
          Math.floor(Math.random() * containerEl.offsetWidth) + "px";
        const confettiAnimation =
          confettiAnimations[
            Math.floor(Math.random() * confettiAnimations.length)
          ];

        confettiEl.classList.add(
          "confetti",
          "confetti--animation-" + confettiAnimation
        );
        confettiEl.style.left = confettiLeft;
        confettiEl.style.width = confettiSize;
        confettiEl.style.height = confettiSize;
        confettiEl.style.backgroundColor = confettiBackground;

        containerEl.appendChild(confettiEl);

        confettiEl.removeTimeout = setTimeout(function () {
          confettiEl.parentNode.removeChild(confettiEl);
        }, 3000);
      }, 25);

      return () => clearInterval(confettiInterval);
    };

    renderConfetti();
  }, []);

  const handleReplayClick = () => {
    // Reset animation and reload page
    $(document).trigger("animate:reset");
    window.location.reload();
  };
  // props.isWinner
  if (props.isWinner) {
    return (
      <>
        <div class="js-container " ref={containerRef}>
          <div className="winner_container">
            <div class="congrats">
              <div class="cool mt-5">
                <span data-text={`Congratulations!, `}>
                  Congratulations!,&nbsp;
                </span>
                <span data-text={`${props.name}`}>{props.name}</span>
              </div>
              {animationCompleted && (
                <button
                  className="replay-button animate__animated animate__bounceIn mt-5"
                  style={{ zIndex: "5000" }}
                  onClick={handleReplayClick}
                >
                  Restart
                </button>
              )}
            </div>
          </div>
        </div>
      </>
    );
  } else {
    setTimeout(() => {
      setAnimationCompleted(true);
    }, 2000);
    return (
      <>
        <div className="main_que_container ">
          <div className="looser">
            <span className="animate__animated animate__fadeInLeftBig animate__slow">
              We loved your confidence,
            </span>
            <span className="animate__animated animate__fadeInLeftBig animate__slower line2">
              &nbsp;Keep trying!!!
            </span>
            {/* <span className="animate__animated animate__fadeInLeftBig animate__fast">
              {" "}
              &#x1F603; &#128077;
            </span> */}
          </div>
          <div className="text-center ">
            {animationCompleted && (
              <button
                className="replay-button mt-4 animate__animated animate__bounceIn"
                onClick={handleReplayClick}
              >
                Restart
              </button>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default Win;
