import React from "react";
import styled from "styled-components";
import { generateCombination } from "gfycat-style-urls";

import { StyledItem } from "./Navbar";
import { ReactComponent as BeautUpLogo } from "../assets/BeatUpLogo.svg";

const styledLandingPage = styled(LandingPage)`
  grid-row: 1/3;
  grid-column: 2/4;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  div {
    margin-top: 1vh;
  }
  h1 {
    font-size: 2.5em;
    font-family: ${(props) => props.theme.alttitleFont};
  }
`;

function LandingPage(props) {
  const Code = generateCombination(2, "-");
  return (
    <div className={props.className}>
      <BeautUpLogo className="logo" />
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
    </div>
  );
}

export default styledLandingPage;
