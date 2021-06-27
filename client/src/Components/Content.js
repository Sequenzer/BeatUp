import React from "react";
import styled from "styled-components";
import Test from "../assets/wide-cafe.jpg";
import { Switch, Route } from "react-router-dom";
import TicTacToeGame from "../games/TicTacToe.js";
import Liar from "../games/Liar.js";

const StyledContent = styled(ContentPage)`
  display: grid;
  grid-template-columns: 3% auto auto 3%;
  grid-template-rows: 50% 50%;
  grid-row: 3/4;
  grid-column: 1/3;

  @keyframes slideToMiddle {
    0% {
      transform: translateX(70%);
    }
    100% {
      transform: translateX(0);
    }
  }

  .bg-img {
    background: url(${process.env.PUBLIC_URL + Test});
    grid-column: 1/3;
    grid-row: 1/3;
    background-size: 75vw 100%;
    clip-path: ${(props) =>
      props.bg_shown ? "circle(90% at 0 100%)" : "circle(0% at 0 100%)"};
    transition: clip-path 1.3s linear;
  }
  .bgio-client {
    height: 100%;
    grid-column: 2/4;
    grid-row: 1/4;
    animation: 1s ease-out 0s 1 slideToMiddle;
  }
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
  return (
    <div className={props.className}>
      <div className="bg-img"></div>
      <Switch>
        <Route exact path="/">
          <StyledEmptyPage Text="Home" />
        </Route>
        <Route path="/about">
          <StyledEmptyPage Text="About" id="About" />
        </Route>
        <Route path="/TTT">
          <TicTacToeGame bg_shown={props.bg_shown} />
        </Route>
        <Route path="/liar">
          <Liar />
        </Route>
      </Switch>
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
