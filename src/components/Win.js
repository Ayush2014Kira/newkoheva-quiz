import React, { useState, useEffect, useRef } from "react";
import "../css/winner.css";
import "../css/confeeti.css";
import $ from "jquery";
import "animate.css";
import congif from "../image/july_shot.gif";
function Win(props) {
  const [animationCompleted, setAnimationCompleted] = useState(false);
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

  // $(function () {
  //   var btn = $(".btn"),
  //     bg_1 = $(".bg-1"),
  //     bg_2 = $(".bg-2"),
  //     ang_a = $(".ang-a"),
  //     ang_b = $(".ang-b"),
  //     ang_c = $(".ang-c"),
  //     text = $(".text"),
  //     glow = $(".glow"),
  //     dots = $(".dots"),
  //     shine = $(".shine");

  //   ang_a
  //     .removeClass("d-none")
  //     .removeClass(ang_a.data("in"))
  //     .addClass(ang_a.data("in"));
  //   ang_b
  //     .removeClass("d-none")
  //     .removeClass(ang_b.data("in"))
  //     .addClass(ang_b.data("in"));
  //   ang_c
  //     .removeClass("d-none")
  //     .removeClass(ang_c.data("in"))
  //     .addClass(ang_c.data("in"));
  //   bg_2
  //     .removeClass("d-none")
  //     .removeClass(bg_2.data("out"))
  //     .addClass(bg_2.data("in"));
  //   setTimeout(function () {
  //     bg_1
  //       .removeClass("d-none")
  //       .removeClass(bg_1.data("out"))
  //       .addClass(bg_1.data("in"));
  //   }, 500);
  //   btn.fadeOut(200);

  //   var start = function () {
  //     ang_a
  //       .removeClass("d-none")
  //       .removeClass(ang_a.data("in"))
  //       .addClass(ang_a.data("in"));
  //     ang_b
  //       .removeClass("d-none")
  //       .removeClass(ang_b.data("in"))
  //       .addClass(ang_b.data("in"));
  //     ang_c
  //       .removeClass("d-none")
  //       .removeClass(ang_c.data("in"))
  //       .addClass(ang_c.data("in"));
  //     bg_2
  //       .removeClass("d-none")
  //       .removeClass(bg_2.data("out"))
  //       .addClass(bg_2.data("in"));
  //     setTimeout(function () {
  //       bg_1
  //         .removeClass("d-none")
  //         .removeClass(bg_1.data("out"))
  //         .addClass(bg_1.data("in"));
  //     }, 500);
  //     btn.fadeOut(200);
  //   };
  //   // btn.on('click',start);
  //   bg_2
  //     .off()
  //     .on(
  //       "animationend webkitAnimationEnd oAnimationEnd mozAnimationEnd",
  //       function () {
  //         setTimeout(function () {
  //           bg_2
  //             .fadeOut("fast")
  //             .addClass("d-none")
  //             .removeClass(bg_2.data("in"));
  //           text.removeClass("d-none").addClass(text.data("in"));
  //         }, 600);
  //       }
  //     );
  //   text
  //     .off()
  //     .on(
  //       "animationend webkitAnimationEnd oAnimationEnd mozAnimationEnd",
  //       function () {
  //         setTimeout(function () {
  //           text.addClass("txt-ind");
  //           glow.removeClass("d-none").addClass(glow.data("in"));
  //           dots.removeClass("d-none");
  //           shine.removeClass("d-none").addClass(shine.data("in"));
  //         }, 50);
  //       }
  //     );
  //   glow
  //     .off()
  //     .on(
  //       "animationend webkitAnimationEnd oAnimationEnd mozAnimationEnd",
  //       function () {
  //         bg_2
  //           .removeAttr("style")
  //           .removeClass("d-none")
  //           .addClass(bg_2.data("out"));
  //       }
  //     );
  //   shine
  //     .off()
  //     .on(
  //       "animationend webkitAnimationEnd oAnimationEnd mozAnimationEnd",
  //       function () {
  //         setTimeout(function () {
  //           dots.fadeOut(300);
  //           glow.fadeOut(500);
  //         }, 1000);
  //         setTimeout(function () {
  //           shine.fadeOut(400);
  //           bg_1.removeClass(bg_1.data("in")).addClass(bg_1.data("out"));
  //         }, 2000);
  //         // setTimeout(function () {
  //         text.removeClass(text.data("in")).addClass(text.data("out"));
  //         setTimeout(function () {
  //           $(document).trigger("animate:reset");
  //         }, 500);
  //         // }, 2500);
  //         setTimeout(() => {
  //           // $(".bg").remove();
  //           setAnimationCompleted(true);
  //         }, 2600);
  //       }
  //     );

  //   $(document).on("animate:reset", function () {
  //     $(".el").each(function () {
  //       $(this)
  //         .addClass("d-none")
  //         .removeClass($(this).data("in"))
  //         .removeClass($(this).data("out"))
  //         .removeAttr("style");
  //     });

  //     text.removeClass("txt-ind");
  //     btn.fadeIn(200);
  //   });
  // });
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
              {animationCompleted && (
                <button
                  className="replay-button  animate__animated animate__bounceIn"
                  onClick={handleReplayClick}
                >
                  Restart
                </button>
              )}
              {/* <img src="" alt="" srcset="" /> */}
              {/* <div className="">Congratulations</div> */}
              <div class="cool">
                <span data-text="Congratulations!">Congratulations!</span>
                {/* <span data-text="o">o</span>
                <span data-text="n">n</span>
                <span data-text="g">g</span>
                <span data-text="r">r</span>
                <span data-text="a">a</span>
                <span data-text="t">t</span>
                <span data-text="u">u</span>
                <span data-text="l">l</span>
                <span data-text="a">a</span>
                <span data-text="t">t</span>
                <span data-text="i">i</span>
                <span data-text="o">o</span>
                <span data-text="n">n</span> */}
              </div>
              {/* <div class="el ang-a animated d-none" data-in="zoomOut"></div>
              <div class="el ang-b animated d-none" data-in="zoomOut"></div>
              <div class="el glow animated d-none" data-in="fadeIn"></div>
              <div
                class="el bg bg-1 animated d-none"
                data-in="fadeIn"
                data-out="zoomOut"
              ></div>
              <div class="el dots animated d-none">
                {" "}
                <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i>{" "}
                <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i>{" "}
                <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i>{" "}
                <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i>{" "}
                <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i>{" "}
                <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i>{" "}
                <i></i> <i></i>
              </div>
              <div
                class="el bg bg-2 animated d-none"
                data-in="zoomIn"
                data-out="bounceOut"
              ></div>
              <div class="el ang-c animated d-none" data-in="zoomOut"></div>
              <div
                class="el shine animated d-none"
                data-in="shineIn"
                data-out="fadeOut"
              ></div>
              <div
                class="el text animated d-none"
                data-in="zoomOutIn"
                data-out="zoomOutLeft"
              >
                CONGRATULATIONS
              </div> */}
            </div>
            {/* <div className="won100 d-flex justify-content-center">
          You Won a $100 Gift Voucher From Koheva!
        </div> */}
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
