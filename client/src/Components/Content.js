import React from "react";
import styled from "styled-components";
import Test from "../assets/wide-cafe.jpg";
import { Routes, Route } from "react-router-dom";
import TicTacToeGame from "../games/TacTacToe/TicTacToe.js";
import Liar from "../games/Liar/Liar.js";
import StyledNewGame from "../Components/NewGame.js";
import InternationalGame from "../games/International/International.js";
import StyledLobbyScreen from "./Lobby.js";
import LandingPage from "./LandingPage.js";

const StyledContent = styled(ContentPage)`
  display: grid;
  min-height: 0;
  grid-template-columns: 3% auto auto 3%;
  grid-template-rows: 50% 50%;
  grid-row: 3/5;
  grid-column: 1/3;
  //overflow: hidden;
  clip: rect(auto, auto, auto, auto);
`;
const StyledEmptyPage = styled(EmptyPage)`
  display: grid;
  grid-template-columns: 10% 5% 30% auto;
  grid-template-rows: 20% 10% 10% auto;
  grid-column: 3/5;
  grid-row: 1/4;
  animation: 1s ease-out 0s 1 slideToMiddle;

  .hd {
    font-family: ${(props) => props.theme.textFont};
    grid-row: 2/3;
    grid-column: 2/4;
    text-decoration: underline;
  }
  .TextBlock {
    font-family: ${(props) => props.theme.textFont};
    grid-row: 3/4;
    grid-column: 2/4;
  }
`;

function ContentPage(props) {
  // let { path, url } = useRouteMatch();

  return (
    <div className={props.className}>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route
          path="/about"
          element={<StyledEmptyPage Text="About" id="About" />}
        />
        <Route
          path="/TTT"
          element={<TicTacToeGame bg_shown={props.bg_shown} />}
        />
        <Route
          path="/createLobby"
          element={
            <StyledNewGame
              bg_shown={props.bg_shown}
              setBg={props.setBg}
              fullpage={true}
            />
          }
        />
        <Route
          path={`/:LobbyID/*`}
          element={
            <StyledLobbyScreen
              bg_shown={props.bg_shown}
              username={props.username}
            />
          }
        />
      </Routes>
    </div>
  );
}
function EmptyPage(props) {
  return (
    <div className={props.className}>
      <h1 className="hd">EmptyContentPage</h1>
      <div className="TextBlock">{props.Text}</div>
    </div>
  );
}

export default StyledContent;
