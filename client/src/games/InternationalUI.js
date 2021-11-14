//import React and styled components
import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import { ReactComponent as Clover } from "../assets/Own Cards/Clover.svg";
//import Clover from "../assets/Own Cards/Clover.svg";
import { ReactComponent as Diamond } from "../assets/Own Cards/Diamond.svg";
import { ReactComponent as Heart } from "../assets/Own Cards/Heart.svg";
import { ReactComponent as Pike } from "../assets/Own Cards/Pike.svg";

var suits = [Clover, Diamond, Heart, Pike];
var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

function Card(props) {
  return (
    <div className={props.className}>
      <div className="up">
        <div className="left">
          <div className="card_value">{props.value}</div>
          <div className="card_suit">{props.children}</div>
        </div>
        <div className="right">
          <div className="card_value">{props.value}</div>
          <div className="card_suit">{props.children}</div>
        </div>
      </div>
      <div className="middle">{props.children}</div>
      <div className="low">
        <div className="left">
          <div className="card_value">{props.value}</div>
          <div className="card_suit">{props.children}</div>
        </div>
        <div className="right">
          <div className="card_value">{props.value}</div>
          <div className="card_suit">{props.children}</div>
        </div>
      </div>
    </div>
  );
}

const StyledCard = styled(Card)`
  margin: 0.5rem;
  width: 500px;
  height: 700px;
  background-color: #fff;
  border-radius: 50px;
  font-size: 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 40px 45px;
  text-align: center;
  .up,
  .low {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .middle {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .middle svg {
    width: 120px;
    height: 120px;
  }
  .card_suit svg {
    width: 60px;
    height: 60px;
  }

  .low .left,
  .low .right {
    transform: rotate(180deg);
  }
`;

function InternationalUI(props) {
  return (
    <div className={props.className}>
      {values.map((value, i) => (
        <StyledCard value={value}>
          <Heart />
        </StyledCard>
      ))}
      {values.map((value, i) => (
        <StyledCard value={value}>
          <Diamond />
        </StyledCard>
      ))}
      {values.map((value, i) => (
        <StyledCard value={value}>
          <Clover />
        </StyledCard>
      ))}
      {values.map((value, i) => (
        <StyledCard value={value}>
          <Pike />
        </StyledCard>
      ))}
    </div>
  );
}

const StyledInternationalUI = styled(InternationalUI)`
  background-color: green;
  padding: 0.5rem;
  font-family: ${(props) => props.theme.cardFont};
`;

export default StyledInternationalUI;
