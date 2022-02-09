import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { Sortable, MultiDrag, qux } from "sortablejs";

import Opponent from "../utils/Opponent";

function Btn(props) {
  return (
    <div className={props.className}>
      <button className="button" onClick={props.onClick}>
        {props.name}
      </button>
    </div>
  );
}

const StyledBtn = styled(Btn).attrs((props) => ({
  height: props.height || (props.width / 2) | 33,
  width: props.width || (props.height * 2) | 66,
  radius:
    props.radius || ((props.height * 4) / 33) | ((props.width * 4) / 66) | 4,
}))`
  background-color: ${(props) => props.theme.primary};
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  border-radius: ${(props) => props.radius}px;
  display: flex;
  justify-content: center;
  align-items: top;
  position: relative;
  z-index: 1;
  box-shadow: ${(props) => ` 0 ${(props.height * 1) / 18}px 0 #2D4C61`};
  .button {
    border: none;
    z-index: 1;
    width: ${(props) => (props.width * 58) / 66}px;
    height: ${(props) => (props.height * 14) / 18}px;
    margin-top: ${(props) => -(props.height * 2) / 18}px;
    border-radius: ${(props) => props.radius}px;
    background-color: ${(props) => props.theme.darkAccent};
    position: relative;
    color: ${(props) => props.theme.lightShade};
    font-family: ${(props) => props.theme.titleFont};
    font-style: normal;
    font-weight: bold;
    font-size: ${(props) => (props.height * 8) / 18}px;
    text-align: center;
    line-height: ${(props) => (props.height * 8) / 18}px;
    box-shadow: ${(props) => ` 0 0 1vw ${props.theme.darkAccent}`};
    :hover {
      box-shadow: ${(props) => ` 0 0 2vw ${props.theme.darkAccent}`};
    }
    :active {
      height: ${(props) => (props.height * 14) / 18}px;
      box-shadow: ${(props) => ` 0 0 3vw ${props.theme.darkAccent}`};
      margin-top: 0;
    }
    ::before {
      content: "";
      position: absolute;
      width: ${(props) => (props.width * 14) / 33}px;
      height: ${(props) => (props.height * 2) / 17}px;
      background-color: white;
      opacity: 0.34;
      left: ${(props) => (props.width * 14) / 33}px;
      top: ${(props) => (props.height * 1) / 17}px;
      border-radius: ${(props) => (0.5 * (props.height * 2)) / 17}px;
    }
  }
  ::before {
    content: "";
    background-color: #995f8c;
    position: absolute;
    top: 0;
    width: ${(props) => (props.width * 58) / 66}px;
    height: ${(props) => (props.height * 15) / 18}px;
    border-radius: ${(props) => props.radius}px;
  }
`;

function PlayerList(props) {
  return (
    <ul className={props.className}>
      {props.players.map((player, index) => (
        <li key={index}>
          <Opponent
            height={props.height}
            active={player.active}
            color={player.color}
          />
          <div className="info">
            <h3>{player.name}</h3>
            <p>{player.score + " cards"}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

const StyledPlayerList = styled(PlayerList)`
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  width: 80%;
  margin-top: ${(props) => -props.height / 1.2}px;
  height: ${(props) => (props.height ? props.height * 1.5 : 75)}px;
  font-family: ${(props) => props.theme.titleFont};
  font-style: normal;
  font-weight: bold;

  li {
    margin-right: 3vw;
  }
  .info {
    color: ${(props) => props.theme.lightShade};
    margin: 0;
    font-size: 100%;
    h3 {
      margin: 0;
      line-height: 0.8em;
    }
    p {
      margin: 0;
    }
  }
`;

const GameBoard = React.forwardRef((props, ref) => {
  const players = [
    {
      name: "Player 1",
      score: 12,
      active: true,
      color: "green",
    },
    {
      name: "Player 2",
      score: 12,
      active: false,
      color: "blue",
    },
  ];

  return (
    <div className={props.className}>
      <StyledPlayerList height={75} players={players} />
      <div className="stack" ref={props.gameboardRef.stack}></div>
      <StyledBtn name={"Liar!"} width={100} height={50} />
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
  flex-direction: column;
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
