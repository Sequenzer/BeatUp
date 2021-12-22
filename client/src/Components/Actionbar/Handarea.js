import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../utils/CardComponent";
import { Draggable, selector } from "gsap/all";
import gsap from "gsap";
gsap.registerPlugin(Draggable);

const CardSlot = React.forwardRef((props, ref) => {
  //get suit and value of the card from props.hand
  var { suit, value } = props.hand[props.cardnumber];
  return (
    <div className={props.className + ` draggable`} ref={ref}>
      <Card suit={suit} value={value} width={props.width} className="card" />
    </div>
  );
});

const StyledCardSlot = styled(CardSlot)`
  width: minmax(${(props) => props.width / 2}em, ${(props) => props.width}em);
  position: absolute;
  top: -5em;
  left: ${(props) => {
    return `calc( ${props.offset} * ${props.cardnumber} + ${props.padding.left_right}vw)`;
  }};
`;

const HandArea = (props) => {
  const handRef = useRef(null);
  const cardRef = useRef([]);
  const curRef = useRef(null);

  const [hand, setHand] = useState(props.hand);

  var dragElements = cardRef.current;

  function onDrop(dragged, dropped) {
    console.log(dragged, dropped);
  }

  Draggable.create(dragElements, {
    bounds: handRef.current,
    onDrag: (e) => {
      var i = dragElements.length;
      while (--i > -1) {
        if (curRef.current.hitTest(dragElements[i], "10%")) {
          console.log("hit", i);
        }
      }
    },
    onDragEnd: (e) => {
      var i = dragElements.length;
      while (--i > -1) {
        if (curRef.current.hitTest(dragElements[i], "10%")) {
          onDrop(curRef, dragElements[i]);
        }
      }
    },
    onDragStart(e) {
      console.log("drag start");
      curRef.current = this;
    },
  });

  useEffect(() => {
    console.log(cardRef.current);
  }, []);

  return (
    <div className={props.className} ref={handRef}>
      {hand.map((card, i) => {
        return (
          // <div className="card_container" key={i}>
          //   <Card suit={card.suit} value={card.value} width={cardwith} />
          // </div>
          <StyledCardSlot
            key={i}
            cardnumber={i}
            ref={(ele) => {
              cardRef.current[i] = ele;
            }}
            hand={hand}
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
