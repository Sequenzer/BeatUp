//import React and styled components
import React from "react";
import styled from "styled-components";

import { ReactComponent as Clover } from "../../assets/Own Cards/Clover.svg";
import { ReactComponent as Diamond } from "../../assets/Own Cards/Diamond.svg";
import { ReactComponent as Heart } from "../../assets/Own Cards/Heart.svg";
import { ReactComponent as Pike } from "../../assets/Own Cards/Pike.svg";

function SuitChoice(props) {
  switch (props.suit) {
    case "Clover":
      console.log(props.suit);
      return <Clover />;
    case "Diamond":
      return <Diamond />;
    case "Heart":
      return <Heart />;
    case "Pike":
      return <Pike />;
    default:
      return <div>Invalid Input!!!</div>;
  }
}

function Card(props) {
  console.log("hello there");
  return (
    <div className={props.className}>
      <div className="up">
        <div className="left">
          <div className="card_value">{props.value}</div>
          <div className="card_suit">
            <SuitChoice suit={props.suit} />
          </div>
        </div>
        <div className="right">
          <div className="card_value">{props.value}</div>
          <div className="card_suit">
            <SuitChoice suit={props.suit} />
          </div>
        </div>
      </div>
      <div className="middle">
        <SuitChoice suit={props.suit} />
      </div>
      <div className="low">
        <div className="left">
          <div className="card_value">{props.value}</div>
          <div className="card_suit">
            <SuitChoice suit={props.suit} />
          </div>
        </div>
        <div className="right">
          <div className="card_value">{props.value}</div>
          <div className="card_suit">
            <SuitChoice suit={props.suit} />
          </div>
        </div>
      </div>
    </div>
  );
}

const StyledCard = styled(Card)`
  width: ${(props) => props.height * (2.5 / 3.5) + "px"};
  height: ${(props) => props.height + "px"};
  background-color: #fff;
  border-radius: ${(props) => props.height * (2.5 / 3.5) * (50 / 500) + "px"};
  font-size: ${(props) => props.height * (2.5 / 3.5) * (60 / 500) + "px"};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  padding: ${(props) =>
    props.height * (2.5 / 3.5) * (40 / 500) +
    "px " +
    props.height * (2.5 / 3.5) * (45 / 500) +
    "px "};
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
    width: ${(props) => props.height * (2.5 / 3.5) * (120 / 500) + "px "};
    height: ${(props) => props.height * (2.5 / 3.5) * (120 / 500) + "px "};
  }
  .card_suit svg {
    width: ${(props) => props.height * (2.5 / 3.5) * (60 / 500) + "px "};
    height: ${(props) => props.height * (2.5 / 3.5) * (60 / 500) + "px "};
  }

  .low .left,
  .low .right {
    transform: rotate(180deg);
  }
`;

export default StyledCard;
