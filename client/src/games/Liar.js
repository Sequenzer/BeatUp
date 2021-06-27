import { Client } from "boardgame.io/react";
import StyledLiarUI from "./LiarUI.js";

const Liar = {
  setup: (ctx) => {
    return {
      deck: [0, 1, 2, 3, 4, 5, 6, 7],
      topCard: 7,
      hand: Array(ctx.numPlayers).fill([]),
      stack: [],
    };
  },
  turn: {
    moveLimit: 1,
  },
  moves: {
    drawCard: (G, ctx) => {
      const card = G.deck.pop();
      if (card !== undefined) {
        G.hand[ctx.currentPlayer].push(card);
      }
    },
    playCard: (G, ctx, id) => {
      const card = G.hand[ctx.currentPlayer][id];
      if (isHigher(card, G.stack[G.stack.length - 1])) {
        G.hand[ctx.currentPlayer].splice(id, 1);
        G.stack.push(card);
      } else {
        console.log("Du Idiot!");
        //Do Nothing
      }
    },
  },
  endIf: (G, ctx) => {
    if (G.stack[G.stack.length - 1] == G.topCard) {
      return { winner: ctx.currentPlayer };
    }
  },
};

function isHigher(card1, card2) {
  if (card2 == undefined) {
    return true;
  }
  return card1 > card2;
}

const LiarGame = Client({
  game: Liar,
  numPlayers: 2,
  board: StyledLiarUI,
});

export default LiarGame;
