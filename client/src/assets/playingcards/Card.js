import React, { useState } from "react";
import * as Cards from "./Components/Standard/index.js";
import SVGCardback from "./Components/Cardbacks/Cardback.js";
import SVGStripes from "./Components/Cardbacks/Stripes.js";
import styled from "styled-components";

function Card(props) {
  const [flipped, flipp] = useState("false");
  //properties
  var cardprops = {
    onClick: () => flipCard(),
    className: props.className,
    height: "100%",
    draggable: props.draggable,
  };

  function flipCard() {
    flipp(!flipped);
  }
  return flipped ? (
    <SVGCardback {...cardprops} />
  ) : (
    Cards[props.id]({ ...cardprops, viewBox: "0 0 261 355" })
  );
}

const StyledCard = styled(Card)`
  height: ${(props) => props.cardscale * props.cardwidth + "px"};
  width: ${(props) => props.cardwidth + "px"};
  box-shadow: 0 1px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%);
  border-radius: 10px;
  transform: ${(props) => "translateX(" + props.offset + "%)"};
`;

export default StyledCard;
