import { Client } from "boardgame.io/react";
import { INVALID_MOVE } from "boardgame.io/core";
import StyledTicTacToeUI from "./TicTacToeUI.js";
import styled from "styled-components";

const TicTacToe = {
  setup: () => ({ cells: Array(9).fill(null) }),
  turn: {
    moveLimit: 1,
  },
  moves: {
    clickCell: (G, ctx, id) => {
      if (G.cells[id] !== null) {
        return INVALID_MOVE;
      }
      G.cells[id] = ctx.currentPlayer;
    },
  },
  endIf: (G, ctx) => {
    if (IsVictory(G.cells)) {
      return { winner: ctx.currentPlayer };
    }
    if (IsDraw(G.cells)) {
      return { draw: true };
    }
  },
};

function IsVictory(cells) {
  const positions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const isRowComplete = (row) => {
    const symbols = row.map((i) => cells[i]);
    return symbols.every((i) => i !== null && i === symbols[0]);
  };

  return positions.map(isRowComplete).some((i) => i === true);
}
// Return true if all `cells` are occupied.
function IsDraw(cells) {
  return cells.filter((c) => c === null).length === 0;
}

const TicTacToeGame = Client({
  game: TicTacToe,
  board: StyledTicTacToeUI,
});

export default TicTacToeGame;
