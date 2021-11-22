import React, { useRef } from "react";
import styled from "styled-components";
import Card from "../utils/CardComponent";

const CardWrapper = (props) => {
  return (
    <div className={props.className}>
      <Card suit={props.suit} value={props.value} width={props.width} />
    </div>
  );
};

const StyledCardWrapper = styled(CardWrapper)`
    width: minmax(${(props) => props.width / 2}em, ${(props) => props.width}em);
    position: absolute;
    top: -5em;
    left: ${(props) => {
      return `calc( ${props.offset} * ${props.cardnumber} + ${props.padding.left_right}vw)`;
    }};
  }
`;

const HandArea = (props) => {
  const handRef = useRef(null);
  return (
    <div className={props.className} ref={handRef}>
      {props.hand.map((card, i) => {
        return (
          // <div className="card_container" key={i}>
          //   <Card suit={card.suit} value={card.value} width={cardwith} />
          // </div>
          <StyledCardWrapper
            key={i}
            cardnumber={i}
            suit={card.suit}
            value={card.value}
            offset={props.offset}
            width={props.cardwidth}
            padding={props.padding}
          />
        );
      })}
    </div>
  );
};
const StyledHandArea = styled(HandArea).attrs((props) => {
  function getOffset() {
    return `calc((${getHandWidth()}vw - ${
      getPadding().left_right * 2
    }vw - ${getCardWidth()}em) / ${props.handsize - 1})`;
  }
  function getPadding() {
    return {
      left_right: getHandWidth() * 0.1,
    };
  }
  var getCardWidth = () => (props.cardwidth ? props.cardwidth : 9);
  var getHandWidth = () => (props.width ? props.width : 50);

  return {
    width: getHandWidth(),
    height: 8,
    padding: getPadding(),
    cardwidth: getCardWidth(),
    offset: getOffset(),
  };
})`
  height: ${(props) => props.height}em;
  width: ${(props) => props.width}vw;
  background-color: ${(props) => props.theme.green};
  justify-content: space-around;
  position: relative;
`;

export default StyledHandArea;
