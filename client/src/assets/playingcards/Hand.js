import React from "react";
import StyledCard from "./Card";
import styled from "styled-components";

function Hand(props) {
  var spsize = 30 / props.hand.length;

  return (
    <div className={props.className}>
      {props.hand.map((ele, i) => (
        <StyledCard
          draggable="true"
          onDragStart={() => console.log("hello ther")}
          key={ele + i}
          id={ele}
          cardscale={props.cardscale}
          cardwidth={props.cardwidth}
          className="handcards"
          offset={i * spsize}
        />
      ))}
    </div>
  );
}

const StyledHand = styled(Hand)`
  width: ${(props) => props.cardwidth + "px"};
  height: ${(props) => props.cardscale * props.cardwidth + "px"};
  position: relative;
  .handcards {
    position: absolute;
  }
`;

export default StyledHand;
