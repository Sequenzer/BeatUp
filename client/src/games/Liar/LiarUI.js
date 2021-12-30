import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

import ActionBar from "../../Components/Actionbar/Actionbar";
import FrameWork from "../../Components/SBLFrame/Framework";
import { Sortable, MultiDrag, qux } from "sortablejs";
import { process_params } from "express/lib/router";

//Draggable import
// import { gsap } from "gsap";
// import Draggable from "gsap/Draggable";
// gsap.registerPlugin(Draggable);

// var temphand = ["Club1", "Diamond2", "Heart3", "Heart1"];

//Example set of 10 Cards
const temphand = [
  { suit: "Clover", value: "A" },
  { suit: "Diamond", value: "2" },
  { suit: "Heart", value: "3" },
  { suit: "Pike", value: "4" },
  { suit: "Clover", value: "5" },
  { suit: "Diamond", value: "6" },
  { suit: "Heart", value: "7" },
  { suit: "Pike", value: "8" },
  { suit: "Clover", value: "9" },
  { suit: "Diamond", value: "10" },
];

function LiarUI(props) {
  const [cardwidth, setCardWidth] = useState(9);
  const [hand, setHand] = useState(temphand);
  const settingsRef = useRef(null);
  const gameboardRef = {
    stack: useRef(null),
    lie: useRef(null),
    honest: useRef(null),
  };
  const actionbarRef = {
    hand: useRef(null),
    cardRef: useRef([]),
  };
  //Mount SortableJS
  useEffect(() => {
    var stack = Sortable.create(gameboardRef.stack.current, {
      group: "game",
      animation: 150,
      direction: "horizontal",
    });
    const sortable = Sortable.create(actionbarRef.hand.current, {
      animation: 150,
      direction: "horizontal",
      ghostClass: "ghost",
      chosenClass: "chosen",
      selectedClass: "selected",
      group: {
        name: "game",
        put: function (to) {
          return to.el.children.length < 4;
        },
      },
      multiDrag: true,

      onEnd: (event) => {
        //Check if it's a legal move
      },
    });
  }, []);

  function onplay() {
    //Cheack where it has been dropped
    //Check if it's a legal move
    //Send to engine
  }

  return (
    <div className={props.className}>
      <FrameWork cardwidth={cardwidth} gameboardRef={gameboardRef} />
      <ActionBar
        cardwidth={cardwidth}
        actionbarRef={actionbarRef}
        hand={hand}
        setHand={setHand}
      >
        {" "}
      </ActionBar>
    </div>
  );
}

const StyledLiarUI = styled(LiarUI)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default StyledLiarUI;
