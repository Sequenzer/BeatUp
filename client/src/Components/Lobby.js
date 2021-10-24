import React, { useState } from "react";
import styled from "styled-components";
import mod from "../games/LiarUI.js";
import { useParams } from "react-router-dom";
//import io from "socket.io-client";

const GameLog = mod.StyledGameLog;
const Settings = mod.StyledSettings;

function LobbyScreen(props) {
  const [selectedOption, setSelected] = useState(undefined);
  let { LobbyId } = useParams();

  const handleOptionClick = (ev, params) => {
    if (selectedOption === params.value) {
      setSelected(undefined);
    } else {
      setSelected(params.value);
    }
  };
  return (
    <div className={props.className}>
      <Settings
        className="settings"
        handleOptionClick={handleOptionClick}
        selected={selectedOption}
      />
      <GameLog className="gamelog" />
    </div>
  );
}

const StyledLobbyScreen = styled(LobbyScreen)`
  grid-row: 1/3;
  grid-column: 2/4;
  display: grid;
  grid-template-rows: 2fr 5fr 2fr;
  min-height: 0;
  grid-template-columns: 3fr 2fr 0.25fr 2fr 3fr;
  .settings,
  .gamelog {
    grid-row: 2/3;
    min-height: 0;
  }
  .settings {
    grid-column: 2/3;
  }
  .gamelog {
    grid-column: 4/5;
  }
`;

export default StyledLobbyScreen;
