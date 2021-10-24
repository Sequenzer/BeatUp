import React from "react";
import styled from "styled-components";
//import { Switch, Route } from "react-router-dom";
//import StyledBtn from "./Btn";
import { generateCombination } from "gfycat-style-urls";
import { StyledItem } from "./Navbar";

function NewLobby(props) {
  const Code = generateCombination(2, "-");
  function handleNewGame(props) {
    console.log(Code);
  }

  return (
    <div className={props.className}>
      <StyledItem
        className="btn"
        to={`/${Code}/Lobby`}
        content="Create Lobby"
        bg_shown={props.bg_shown}
        setBg={props.setBg}
        fullpage={props.fullpage}
        onClick={(event) => handleNewGame(event)}
      />
      <StyledItem
        className="btn"
        to="/"
        content="Browse Games"
        bg_shown={props.bg_shown}
        setBg={props.setBg}
        fullpage={false}
      />
    </div>
  );
}
const StyledNewLobby = styled(NewLobby)`
  grid-row: 1/3;
  grid-column: 2/4;
  display: flex;
  justify-content: center;
  align-items: center;

  .btn {
    margin-left: 2.5em;
    user-select: none;
  }
`;

export default StyledNewLobby;
