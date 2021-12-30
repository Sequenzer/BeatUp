import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { Sortable, MultiDrag, qux } from "sortablejs";

const GameBoard = React.forwardRef((props, ref) => {
  return props.newstack ? (
    <div className={props.className}>
      <div className="lie" ref={props.gameboardRef.lie}>
        {" "}
        Cheat!
      </div>
      <div className="honest" ref={props.gameboardRef.honest}>
        {" "}
        Be Honest!
      </div>
    </div>
  ) : (
    <div className={props.className}>
      <div className="stack" ref={props.gameboardRef.stack}></div>
    </div>
  );
});
const StyledGameBoard = styled(GameBoard).attrs((props) => {
  var getStackWidth = () => (props.cardwidth ? props.cardwidth * 4 : 9 * 4);
  var getCardWidth = () => (props.cardwidth ? props.cardwidth : 9);

  return {
    stackwidth: getStackWidth(),
    cardwidth: props.cardwidth || props.height * (2.5 / 3.5) || 5,
    cardheight: props.cardheight || props.cardwidth * (3.5 / 2.5) || 7,
    stackpadding: {
      top_bottom: props.cardheight * (1 / 2) || 1,
      left_right: props.carwidth * (1 / 3.5) || 1,
    },
  };
})`
  grid-column: 3/6;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  .stack {
    color: ${(props) => props.theme.white};
    height: ${(props) =>
      props.cardheight + 2 * props.stackpadding.top_bottom}vw;
    width: ${(props) =>
      props.cardheight * 4 + 2 * props.stackpadding.left_right}vw;
    border: ${(props) => "1px dashed " + props.theme.white};
    box-sizing: border-box;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-family: ${(props) => props.theme.textFont};
    font-size: 2em;
  }
  .card {
    width: ${(props) => props.cardwidth}vw;
    height: ${(props) => props.cardheight}vw;
    border-radius: ${(props) => (props.cardwidth * 1) / 10}vw;
  }
  .lie,
  .honest {
    width: ${(props) => props.cardwidth + props.stackpadding.left_right}vw;
    height: ${(props) => props.cardheight}vw;
    border-radius: ${(props) => (props.cardwidth * 1) / 10}vw;
    border: ${(props) => "1px dashed " + props.theme.white};
    color: ${(props) => props.theme.white};
    box-sizing: border-box;
    font-family: ${(props) => props.theme.textFont};
    justify-content: space-around;
    font-size: 2em;
    text-align: center;
  }
  .honest {
  }
`;

export default StyledGameBoard;
