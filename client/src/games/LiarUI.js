import React, { useState } from "react";
import styled from "styled-components";
import StyledHand from "../assets/playingcards/Hand";
import StyledCard from "../assets/playingcards/Card";

function LiarUI(props) {
  const cardscale = 355 / 261;
  const cardwidth = 200;
  var temphand = ["Club1", "Diamond2", "Heart3", "Heart1"];

  return (
    <div className={props.className}>
      <FrameWork />
      <ActionBar />
      {/*<StyledHand
          cardscale={cardscale}
          cardwidth={cardwidth}
          hand={temphand}
        />*/}
      {/*<StyledCard id="Club4" cardscale={cardscale} cardwidth={cardwidth} />*/}
    </div>
  );
}

const StyledLiarUI = styled(LiarUI)`
  margin-top: 3rem;
  width: 100%;
  height: 50vh;
  background: blue;
  .framework {
    background: ${(props) => props.theme.green};
    height: 50vh;
    display: grid;
    grid-template-columns: 7.5vw 7.5vw 7.5vw auto 7.5vw 7.5vw 7.5vw;
  }
  .actionbar {
    height: auto;
    background: green;
  }
  .settings-box {
  }
  .gamelog-box {
    grid-column: 6/8;
    height: 100%;
    background: ${(props) => props.theme.secondary};
  }
  .header {
  }
`;

const Header = (props) => (
  <div className={props.className}>{props.content}</div>
);
const Button = (props) => <div className={props.className}>{props.name}</div>;
const StyledButton = styled(Button)`
  background-color: red;
`;

const ActionBar = (props) => <div className="actionbar" />;

const Settings = (props) => (
  <div className={props.className}>
    <Header content="Settings" className="header" />
    <ul>
      <li>
        <StyledButton name="Restart Game" />
      </li>
      <li>
        <StyledButton content="History" />
      </li>
      <li>
        <StyledButton content="Options" />
      </li>
      <li>
        <StyledButton content="Give Up!" />
      </li>
    </ul>
  </div>
);

const StyledSettings = styled(Settings)`
  grid-column: 1/3;
  height: 100%;
  background: ${(props) => props.theme.secondary};
  .header {
    background-color: ${(props) => props.theme.secDark};
    text-align: center;
    color: white;
    font-family: ${(props) => props.theme.titleFont};
    font-size: 1.3em;
    line-height: 2em;
  }
  ul {
    display: flex;
    flex-direction: column;
    background-color: ${(props) => props.theme.secDark};
    list-style: none;
    box-shadow: inset -16px 0px 16px rgba(0, 0, 0, 0.05),
      inset -8px 0px 8px rgba(0, 0, 0, 0.1);
  }
`;
const GameLog = (props) => <div className="gamelog-box" />;
const GameBoard = (props) => <div className="gameboard" />;
const FrameWork = (props) => (
  <div className="framework">
    <StyledSettings />
    <GameBoard />
    <GameLog />
  </div>
);
export default StyledLiarUI;
