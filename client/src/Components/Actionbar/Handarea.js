import React, { useRef } from "react";
import styled from "styled-components";
import Card from "../utils/CardComponent";
import { Sortable, MultiDrag } from "sortablejs";
Sortable.mount(new MultiDrag());

const CardSlot = React.forwardRef((props, ref) => {
  //get suit and value of the card from props.hand
  var { suit, value } = props.hand[props.cardnumber];
  return (
    <div className={props.className} ref={ref} suit={suit} value={value}>
      <Card suit={suit} value={value} width={props.width} className="card" />
    </div>
  );
});

const StyledCardSlot = styled(CardSlot)`
  width: minmax(${(props) => props.width / 2}em, ${(props) => props.width}em);
  display: block;
  grid-row: 1;
`;

const HandArea = (props) => {
  const cardRef = useRef([]);

  return (
    <div className={props.className} ref={props.handareaRef.hand}>
      {props.hand.map((card, i) => {
        return (
          <StyledCardSlot
            className={`card`}
            key={i}
            cardnumber={i}
            ref={(ele) => {
              props.handareaRef.cardRef.current[i] = ele;
            }}
            hand={props.hand}
            setHand={props.setHand}
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

  var getGrid = () => {
    var grid = [];
    props.hand.forEach((card, i) => {
      grid.push(getOffset());
    });
    return grid;
  };

  return {
    width: getHandWidth(),
    height: 8,
    padding: getPadding(),
    cardwidth: getCardWidth(),
    offset: getOffset(),
    grid: getGrid(),
  };
})`
  height: ${(props) => props.height}em;
  width: ${(props) => props.width}vw;
  background-color: ${(props) => props.theme.green};
  display: grid;
  grid-template-columns: ${(props) => props.grid.join(" ")};
  grid-template-rows: 1fr;
  padding: 0 ${(props) => props.padding.left_right}vw;

  .card {
    margin-top: -3em;
  }

  .ghost {
    opacity: 0.5;
    z-index: -1;
  }
  .chosen {
    opacity: 0.1;
  }
  .selected svg {
    border: 2px solid red;
  }
`;

export default StyledHandArea;
