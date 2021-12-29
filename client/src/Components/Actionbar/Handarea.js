import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Card from "../utils/CardComponent";
import Sortable, { Swap } from "sortablejs";
Sortable.mount(new Swap());
// import { Draggable } from "gsap/all";
// import gsap from "gsap";
// gsap.registerPlugin(Draggable);

function getPosByNumber(hand, handPos, number) {
  var card = hand[number];
  return handPos.indexOf(card);
}

const CardSlot = React.forwardRef((props, ref) => {
  //get suit and value of the card from props.hand
  var { suit, value } = props.hand[props.cardnumber];
  return (
    <div className={props.className} ref={ref}>
      <Card suit={suit} value={value} width={props.width} className="card" />
    </div>
  );
});

const StyledCardSlot = styled(CardSlot)`
  width: minmax(${(props) => props.width / 2}em, ${(props) => props.width}em);
  position: absolute;
  top: -5em;
  left: ${(props) => {
    return `calc( ${props.offset} * ${getPosByNumber(
      props.hand,
      props.handPos,
      props.cardnumber
    )} + ${props.padding.left_right}vw)`;
  }};
`;

const HandArea = (props) => {
  const [hand, setHand] = useState(props.hand);
  const [handPos, setPos] = useState(hand);
  console.log(handPos);
  const handRef = useRef(null);
  const cardRef = useRef([]);

  useEffect(() => {
    console.log(cardRef.current, handRef);
  }, []);
  useEffect(() => {
    const sortable = Sortable.create(handRef.current, {
      swap: true, // Enable swap plugin
      swapClass: "highlight", // The class applied to the hovered swap item
      animation: 150,
      onSort: function (evt) {
        setPos((oldPos) => {
          var newPos = [];
          oldPos.forEach((ele, i) => {
            if (i === evt.oldIndex) {
              newPos[i] = oldPos[evt.newIndex];
            } else if (i === evt.newIndex) {
              newPos[i] = oldPos[evt.oldIndex];
            } else {
              newPos[i] = ele;
            }
          });
          return newPos;
        });
      },
    });
    console.log(sortable);
  }, []);

  useEffect(() => {
    console.log(handPos);
  }, [handPos]);
  return (
    <div className={props.className} ref={handRef}>
      {hand.map((card, i) => {
        return (
          // <div className="card_container" key={i}>
          //   <Card suit={card.suit} value={card.value} width={cardwith} />
          // </div>
          <StyledCardSlot
            className={`${i}`}
            key={i}
            cardnumber={i}
            ref={(ele) => {
              cardRef.current[i] = ele;
            }}
            hand={hand}
            handPos={handPos}
            setHand={setHand}
            offset={props.offset}
            width={props.cardwidth}
            padding={props.padding}
            handRef={handRef}
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
