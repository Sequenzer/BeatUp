import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { generateCombination } from "gfycat-style-urls";

import { StyledItem } from "./Navbar";
import { BeatUpLogo } from "./utils/BeatUpLogo";
import Wave from "./utils/wave";

const wavy = keyframes`
  0%,100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(1vh);
  }
`;

const styledLandingPage = styled(LandingPage)`
  grid-row: 1/3;
  grid-column: 1/5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  h1 {
    font-size: 2.5em;
    font-family: ${(props) => props.theme.alttitleFont};
  }
  .logo {
    height: 40vh;
    margin-bottom: -10vh;
    filter: drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.25))
      drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.2))
      drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.15))
      drop-shadow(0px 8px 8px rgba(0, 0, 0, 0.1))
      drop-shadow(0px 16px 16px rgba(0, 0, 0, 0.05));
  }
  .logo:hover {
  }
  .waves {
    width: 100%;
    position: relative;
    overflow: hidden;
    height: 1500px;
  }
  .content {
    width: 100vw;
    height: 100vh;
    background-color: ${(props) => props.theme.lightShade};
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 1000;
    h1 {
      font-size: 2.5em;
      margin-top: -10vh;
    }
  }
  .btn-list {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    margin-top: 2vh;
  }
`;

const StyledWave = styled(Wave).attrs((props) => ({
  left: props.pos,
  opacity: 25 + props.pos * 25,
}))`
  z-index: ${(props) => 100 + props.pos};
  position: absolute;
  left: ${(props) => -props.pos * 75}px;
  opacity: ${(props) => props.opacity}%;
  animation: ${wavy} 4s ease-in-out infinite;
  animation-delay: ${(props) => props.pos * 0.5}s;
  height: 100%;
`;

function LandingPage(props) {
  const Code = generateCombination(2, "-");
  const [mainLogo, setMainLogo] = useState(false);

  return (
    <div className={props.className}>
      <div
        className="logo"
        onMouseEnter={() => setMainLogo(true)}
        onMouseLeave={() => setMainLogo(false)}
      >
        <BeatUpLogo light={false} punched={mainLogo} />
      </div>

      <section className="waves">
        <StyledWave pos={0} />
        <StyledWave pos={1} />
        <StyledWave pos={2} />
        <StyledWave pos={3} />
      </section>
      <section className="content">
        <h1>Welcome to the game!</h1>
        <div className="btn-list">
          <StyledItem
            className="btn"
            to={`/${Code}/Lobby`}
            content="Create Lobby"
            setBg={props.setBg}
            fullpage={props.fullpage}
          />
          <StyledItem className="btn" to="/" content="Browse Games" />
        </div>
      </section>
    </div>
  );
}

export default styledLandingPage;
