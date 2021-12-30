import React, { useRef } from "react";
import styled from "styled-components";

import Settings from "./Settings";
import GameBoard from "./Gameboard";
import GameLog from "./Gamelog";

const FrameWork = (props) => {
  const settingsRef = useRef(null);
  console.log(props.gameboardRef);

  return (
    <div className={props.className}>
      <Settings />
      <GameBoard
        gameboardRef={props.gameboardRef}
        cardwidth={props.cardwidth}
        value={props.value}
        stack={props.stack}
        showPopup={props.showPopup}
        lastSuit={props.lastSuit}
        setvalue={props.setvalue}
        newstack={false}
      />
      <GameLog />
    </div>
  );
};
const StyledFrameWork = styled(FrameWork)`
  margin-top: 3rem;
  height: 50vh;
  background: ${(props) => props.theme.green};
  display: grid;
  grid-template-rows: 100%;
  grid-template-columns: 7.5vw 7.5vw 7.5vw auto 7.5vw 7.5vw 7.5vw;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25),
    0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25),
    0px 16px 16px rgba(0, 0, 0, 0.05);
`;

export default StyledFrameWork;
