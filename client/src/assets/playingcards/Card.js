import React, { useState, useEffect, useRef } from "react";
import * as Cards from "./Components/Standard/index.js";
import SVGCardback from "./Components/Cardbacks/Cardback.js";
import SVGStripes from "./Components/Cardbacks/Stripes.js";
import styled from "styled-components";

function Card(props) {
  var id = "card";
  var card = props.id;
  var pos = props.pos;
  var onhand = props.onhand;

  var cardprops = {
    className: props.className,
    height: "100%",
  };
  if (props.dummy) {
    return (
      <div>
        {Cards[props.id]({
          ...cardprops,
          viewBox: "0 0 261 355",
        })}
      </div>
    );
  } else {
    return (
      <div
        draggable
        style={{ marginBottom: "5em" }}
        onDragStart={(ev) =>
          props.handleDragstart(ev, { id, card, pos, onhand })
        }
        onDragEnter={(ev) =>
          props.handleDragEnter(ev, { id, card, pos, onhand })
        }
        onDragLeave={(ev) =>
          props.handleDragLeave(ev, { id, card, pos, onhand })
        }
        onClick={(ev) => {
          props.handleClick(ev, { id, card, pos, onhand });
        }}
      >
        {Cards[props.id]({
          ...cardprops,
          viewBox: "0 0 261 355",
        })}
      </div>
    );
  }
}

const StyledCard = styled(Card)`
  height: auto;
  margin-top: ${(props) => (props.dummy ? 0 : "-5em")};
  width: 8em;
  border-radius: 10px;
  border-style: ${(props) =>
    props.staged.indexOf(props.pos) !== -1 ? "solid" : "none"};
  transform: ${(props) => "translateX(" + props.offset + "%)"};
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

export default StyledCard;
