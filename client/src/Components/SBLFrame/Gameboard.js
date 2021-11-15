import React from "react";
import styled from "styled-components";

const GameBoard = (props) => {
  return (
    <div className={props.className}>
      <div className="stack"></div>
    </div>
  );
};
const StyledGameBoard = styled(GameBoard)`
  grid-column: 3/6;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  .stack {
    color: ${(props) => props.theme.white};
    height: 60%;
    width: 30%;
    border: ${(props) => "1px dashed " + props.theme.white};
    box-sizing: border-box;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-family: ${(props) => props.theme.textFont};
    font-size: 2em;
  }
`;

export default StyledGameBoard;
