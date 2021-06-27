import React, { useState } from "react";
import styled from "styled-components";
import o from "../assets/xo.svg";

function TicTacToeUI(props) {
  let winner = (
    <div className="winner">Its is {props.ctx.currentPlayer}'s Turn</div>
  );
  function onClick(id) {
    props.moves.clickCell(id);
    console.log(props);
  }
  if (props.ctx.gameover) {
    winner =
      props.ctx.gameover.winner !== undefined ? (
        <div className="winner">Winner: {props.ctx.gameover.winner}</div>
      ) : (
        <div className="winner">Draw!</div>
      );
  }

  let tbody = [];
  for (let i = 0; i < 3; i++) {
    let cells = [];
    for (let j = 0; j < 3; j++) {
      const id = 3 * i + j;
      cells.push(
        <div className="cells" key={id} onClick={() => onClick(id)}>
          {props.G.cells[id]}
        </div>
      );
    }
    tbody.push(
      <div className="rows" key={i}>
        {cells}
      </div>
    );
  }
  return (
    <div className={props.className}>
      <div className="board">{tbody}</div>
      {winner}
      <StyledReset Gprops={props} />
    </div>
  );
}

const StyledTicTacToeUI = styled(TicTacToeUI)`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: auto 60% 10% auto;
  height: 100%;
  width: 100%;
  .cells {
    border: 1px solid #555;
    background: ${(props) => props.theme.primary};
    font-family: ${(props) => props.theme.textFont};
    border-radius: 5%;
    height: 30%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 5rem;
  }
  .rows {
    width: 30%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .board {
    grid-row: 2/3;
    grid-column: 1/3;
    background: ${(props) => props.theme.secondary};
    display: flex;
    justify-content: space-around;
    border-radius: 5px 5px 0 0;
  }
  .winner {
    grid-row: 3/4;
    grid-column: 1/2;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 1.5rem;
    background: ${(props) => props.theme.secondary};
    border-radius: 0 0 0 5px;
  }
`;

const StyledReset = styled(Reset)`
  grid-row: 3/4;
  grid-column: 2/3;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 1.5rem;
  background: ${(props) => props.theme.secondary};
  border-radius: 0 0 5px 0;
  .reset-btn {
    background: ${(props) => props.theme.primary};
    border: 1px solid #555;
    border-radius: 5%;
    height: 50%;
    padding: 0 3rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    user-select: none;
    :hover {
      box-shadow: ${(props) => props.theme.boxShadow};
      cursor: pointer;
    }
    :active {
      background: ${(props) => props.theme.secDark};
    }
  }
`;
function Reset(props) {
  return (
    <div className={props.className}>
      <div className="reset-btn" onClick={() => props.Gprops.reset()}>
        Reset Button
      </div>
    </div>
  );
}
export default StyledTicTacToeUI;
