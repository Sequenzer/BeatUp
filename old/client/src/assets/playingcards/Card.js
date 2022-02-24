import React, { useState } from "react";
import * as Cards from "./Components/Standard/index.js";
//import SVGCardback from "./Components/Cardbacks/Cardback.js";
//import SVGStripes from "./Components/Cardbacks/Stripes.js";
import styled from "styled-components";

function Card(props) {
  const [clicked, setClicked] = useState(false);
  var id = "card";
  var card = props.id;
  var pos = props.pos;
  var onhand = props.onhand;

  var cardprops = {
    className: props.className,
    height: "100%",
  };
  return (
    <div
      style={{ marginBottom: "5em" }}
      className={"card"}
      id={card}
      onClick={(ev) => {
        setClicked(!clicked);
        props.handleClick(ev, { id, card, pos, onhand });
      }}
    >
      {Cards[card]({
        ...cardprops,
        viewBox: "0 0 261 355",
      })}
    </div>
  );
}

const StyledCard = styled(Card)`
  height: auto;
  overflow: auto;
  margin-top: ${(props) =>
    props.staged.indexOf(props.pos) !== -1 ? "-8em" : "-5em"};
  position: absolute;
  left: ${(props) => {
    if (props.barwidth) {
      var barwidth = parseInt(props.barwidth.slice(0, -2)) - 20;
      var offset = (barwidth - props.cardwidth) / (props.handsize - 1);
      var left = 0;
      if (props.inHand) {
        left = offset * props.pos;
      } else {
        //Do Nothing
      }
    }

    if (isNaN(left)) {
      return (barwidth - props.cardwidth) / 2 + "px";
    }
    return 10 + left + "px";
  }}};
  width: ${(props) => props.cardwidth + "px"};
  border-radius: 10px;
  border-style: ${(props) =>
    props.staged.indexOf(props.pos) !== -1 ? "solid" : "none"};

  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

export default StyledCard;
