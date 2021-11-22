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
      return <Clover {...props} />;
    case "Diamond":
      return <Diamond {...props} />;
    case "Heart":
      return <Heart {...props} />;
    case "Pike":
      return <Pike {...props} />;
    default:
      return <div>Invalid Input!!!</div>;
  }
}

function Card(props) {
  var height = 700;
  var width = 500;
  var symbolheight = {
    small: 60,
    big: 120,
    text: 60,
  };
  var padding = {
    top_bottom: width * (40 / 500),
    left_right: width * (45 / 500),
  };
  var text_logo_spacing = 10;

  return (
    <svg className={props.className} viewBox="0 0 500 700">
      <g className="up">
        <g className="left">
          <text
            className="card_value"
            x={padding.left_right + symbolheight.small / 2}
            y={padding.top_bottom + symbolheight.text}
            style={{ fontSize: symbolheight.text, textAnchor: "middle" }}
          >
            {props.value}
          </text>
          <SuitChoice
            suit={props.suit}
            x={padding.left_right}
            y={padding.top_bottom + symbolheight.text + text_logo_spacing}
            height={symbolheight.small}
            width={symbolheight.small}
          />
        </g>
        <g className="right">
          <text
            className="card_value"
            x={width - symbolheight.small / 2 - padding.left_right}
            y={padding.top_bottom + symbolheight.text}
            style={{ fontSize: symbolheight.text, textAnchor: "middle" }}
          >
            {props.value}
          </text>
          <SuitChoice
            suit={props.suit}
            x={width - symbolheight.small - padding.left_right}
            y={padding.top_bottom + symbolheight.text + text_logo_spacing}
            height={symbolheight.small}
            width={symbolheight.small}
          />
        </g>
      </g>
      <SuitChoice
        suit={props.suit}
        x={(width - symbolheight.big) / 2}
        y={(height - symbolheight.big) / 2}
        height={symbolheight.big}
        width={symbolheight.big}
      />
      <g className="low" style={{ transform: "rotate(180deg)" }}>
        <g className="left">
          <text
            className="card_value"
            x={
              -(padding.left_right + symbolheight.text - symbolheight.small / 2)
            }
            y={-(height - padding.top_bottom - symbolheight.small)}
            style={{ fontSize: symbolheight.text, textAnchor: "middle" }}
          >
            {props.value}
          </text>
          <SuitChoice
            suit={props.suit}
            x={-(padding.left_right + symbolheight.text)}
            y={
              -(
                height -
                padding.top_bottom -
                symbolheight.small -
                text_logo_spacing
              )
            }
            height={symbolheight.small}
            width={symbolheight.small}
          />
        </g>
        <g className="right">
          <text
            className="card_value"
            x={-(width - padding.left_right - symbolheight.small / 2)}
            y={-(height - padding.top_bottom - symbolheight.small)}
            style={{ fontSize: symbolheight.text, textAnchor: "middle" }}
          >
            {props.value}
          </text>
          <SuitChoice
            suit={props.suit}
            x={-(width - padding.left_right)}
            y={
              -(
                height -
                padding.top_bottom -
                symbolheight.small -
                text_logo_spacing
              )
            }
            height={symbolheight.small}
            width={symbolheight.small}
          />
        </g>
      </g>
    </svg>
  );
}

const StyledCard = styled(Card).attrs((props) => ({
  height: props.height || props.width * (3.5 / 2.5) || 7,
  width: props.width || props.height * (2.5 / 3.5) || 5,
}))`
  width: ${(props) => props.width}em;
  height: ${(props) => props.height}em;
  background-color: #fff;
  border-radius: ${(props) => props.width * (50 / 500)}em;
  font-family: ${(props) => props.theme.cardFont};
  box-shadow: 0 0 0.5vw 0 rgba(0, 0, 0, 0.5);
`;

export default StyledCard;
