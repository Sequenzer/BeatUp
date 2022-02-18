import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

import ActionBar from "../../Components/Actionbar/Actionbar";
import FrameWork from "../../Components/SBLFrame/Framework";

import Sortable, { MultiDrag } from "sortablejs";

function LiarUI(props) {
  const [cardwidth, setCardWidth] = useState(9);
  const [hand, setHand] = useState(props.G.hand[props.playerID]);
  const [stack, setStack] = useState([]);
  var turn = props.ctx.currentPlayer === props.playerID;
  const gameboardRef = {
    stack: useRef(null),
    lie: useRef(null),
    honest: useRef(null),
  };
  const actionbarRef = {
    hand: useRef(null),
    cardRef: useRef([]),
  };

  //Set MatchID and PlayerID

  //Mount SortableJS
  useEffect(() => {
    var stack = Sortable.create(gameboardRef.stack.current, {
      animation: 150,
      direction: "horizontal",
      multiDrag: true,

      group: {
        name: "stack",
        put: function (to, from, element) {
          return allowedToPlay(to, from, element);
        },
      },
      onAdd: (evt) => {
        onPlay(evt);
      },
    });
    const actionbar = Sortable.create(actionbarRef.hand.current, {
      animation: 150,
      direction: "horizontal",
      ghostClass: "ghost",
      chosenClass: "chosen",
      selectedClass: "selected",
      onSelect: (evt) => {
        if (evt.items.length > 4) {
          Sortable.utils.deselect(evt.item);
        }
      },
      group: {
        pull: "clone",
        name: "hand",
        put: false,
      },
      multiDrag: true,
      onEnd: (event) => {
        //Check if it's a legal move
      },
    });
  }, []);

  function onPlay(evt) {
    console.log("Something was played.");
    console.log(evt);

    function parseValue(string) {
      if (isNaN(parseInt(string))) {
        return string;
      } else {
        return parseInt(string);
      }
    }
    var play = {
      value: parseValue(evt.item.getAttribute("value")),
      ids: [],
    };

    if (evt.items.length > 0) {
      evt.items.forEach((item) => {
        var card = {
          suit: item.getAttribute("suit"),
          value: parseValue(item.getAttribute("value")),
        };
        play.ids.push(
          hand.findIndex(
            (ele) => ele.suit === card.suit && ele.value === card.value
          )
        );
      });
    } else {
      var card = {
        suit: evt.item.getAttribute("suit"),
        value: parseValue(evt.item.getAttribute("value")),
      };
      play.ids.push(
        hand.findIndex(
          (ele) => ele.suit === card.suit && ele.value === card.value
        )
      );
    }
    //Check if it's a legal move
    //Send to engine
    props.moves.playCard(play);
  }
  function allowedToPlay(to, from, element) {
    var card = {
      suit: element.getAttribute("suit"),
      value: element.getAttribute("value"),
    };
    return to.el.children.length < 4 && turn;
  }

  return (
    <div className={props.className}>
      <FrameWork
        cardwidth={cardwidth}
        gameboardRef={gameboardRef}
        chatStates={props.chatStates}
        stack={stack}
        setStack={setStack}
      />
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
