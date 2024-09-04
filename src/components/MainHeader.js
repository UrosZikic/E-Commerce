import "../styles/mainHeader.css";
import wukongImage from "../images/topseller/wukong.webp";
import spaceMarine from "../images/topseller/spacemarine.webp";
import blackops from "../images/topseller/blackops.webp";
import IonIcon from "@reacticons/ionicons";
import MultipleItems from "../components/carousel";
import UpComing from "../components/upcoming";

import { useState, useEffect, useRef } from "react";

const topSellers = [
  {
    name: "Black Myth: Wukong",
    desc: "Black Myth: Wukong is an action RPG rooted in Chinese mythology. You shall set out as the Destined One to venture into the challenges and marvels ahead, to uncover the obscured truth beneath the veil of a glorious legend from the past.",
    src: wukongImage,
    hyperLink: `http://localhost:3000/pages/product?id=49`,
  },
  {
    name: "Warhammer 40,000: Space Marine 2",
    desc: "Embody the superhuman skill and brutality of a Space Marine. Unleash deadly abilities and devastating weaponry to obliterate the relentless Tyranid swarms. Defend the Imperium in spectacular third-person action in solo or multiplayer modes.",
    src: spaceMarine,
    hyperLink: `http://localhost:3000/pages/product?id=50`,
  },
  {
    name: "Call of Duty®: Black Ops 6",
    desc: "Call of Duty®: Black Ops 6 is signature Black Ops across a cinematic single-player Campaign, a best-in-class Multiplayer experience and with the epic return of Round-Based Zombies.",
    src: blackops,
    hyperLink: `http://localhost:3000/pages/product?id=51`,
  },
];

export default function MainHeader() {
  const [sellerId, setSellerId] = useState(0);
  const [animate, setAnimate] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const animateInterval = setInterval(() => {
      setAnimate((prevVal) => prevVal + 1);
    }, 250);

    // Clear the interval when `animate` reaches 5
    if (animate >= 7) {
      clearInterval(animateInterval);
    }

    // Cleanup to clear the interval on component unmount or dependency change
    return () => clearInterval(animateInterval);
  }, [animate]);

  return (
    <>
      <header className="defaultWidth mainHeader positionRelative">
        {
          <img
            style={{
              opacity: animate >= 3 ? "1" : "0",
            }}
            src={
              animate >= 2
                ? topSellers[sellerId].src
                : topSellers[currentSlide].src
            }
            alt="topseller"
          />
        }

        <button
          className="positionAbsolute animationPrev"
          style={{
            left: "0",
          }}
          onClick={() => {
            setAnimate(0);
            setCurrentSlide(sellerId);
            setSellerId((prev) => (prev === 0 ? 2 : prev - 1));
          }}
        >
          <IonIcon className="" name="chevron-back-outline" />
        </button>
        <div
          className="mainHeaderOverlay positionAbsolute defaultFlex flexColumn flexJustifyCenter"
          style={{
            backgroundColor: `${
              animate >= 2 ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 1)"
            }`,
          }}
        >
          {animate >= 2 && (
            <div className="mainOverLayInfo">
              <h1
                style={{
                  color: `${animate >= 3 ? "white" : "transparent"}`,
                  transform: `translateY(${animate >= 4 ? "4rem" : "0"})`,
                }}
              >
                {topSellers[sellerId].name}
              </h1>
              <p
                style={{
                  color: `${animate >= 4 ? "white" : "transparent"}`,
                  transform: `translateY(${animate >= 5 ? "4rem" : "0"})`,
                }}
              >
                {topSellers[sellerId].desc}
              </p>
              <p
                style={{
                  color: `${animate >= 6 ? "white" : "transparent"}`,
                  transform: `translateY(${animate >= 7 ? "4rem" : "0"})`,
                }}
              >
                <a
                  style={{
                    color: `${animate >= 6 ? "white" : "transparent"}`,
                    border: `${
                      animate >= 6 ? "2px solid white" : "2px solid transparent"
                    }`,
                  }}
                  href={topSellers[sellerId].hyperLink}
                >
                  Check out
                </a>
              </p>
            </div>
          )}
        </div>
        <button
          className="positionAbsolute animationNext"
          style={{
            right: "0",
          }}
          onClick={() => {
            setAnimate(0);
            setCurrentSlide(sellerId);

            setSellerId((prev) => (prev === 2 ? 0 : prev + 1));
          }}
        >
          <IonIcon className="" name="chevron-forward-outline" />
        </button>
      </header>
      <MultipleItems />
      <UpComing />
    </>
  );
}
