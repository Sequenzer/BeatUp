import { Client } from "boardgame.io/react";
import LiarUI from "./LiarUI.js";

//All Cards
var cards = [];
["Club", "Diamond", "Heart", "Spade"].forEach((suit) => {
  Array(10)
    .fill(1)
    .forEach((ele, i) => {
      cards.push(suit + (i + 1));
    });
  cards.push(suit + "11Jack");
  cards.push(suit + "12Queen");
  cards.push(suit + "13King");
});

//Shuffle cards
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}
var scards = shuffle(cards);

const Liar = {
  setup: (ctx) => {
    return {
      lastValue: undefined,
      lastNum: 0,
      lastPlayer: undefined,
      hand: Array(ctx.numPlayers)
        .fill(1)
        .map((ele, i) => {
          var numcards = Math.floor(scards.length / ctx.numPlayers);
          return scards.slice(i * numcards, (i + 1) * numcards);
        }),
      stack: [],
      ranking: [],
    };
  },
  turn: {
    moveLimit: 1,
    onEnd: (G, ctx) => {
      if (G.hand[ctx.currentPlayer].length === 0) {
        G.ranking.push(ctx.currentPlayer);
      }
    },
  },
  moves: {
    playCard: (G, ctx, input) => {
      // type {value: string, ids: Array of string}
      console.log("playing card", input);
      if (G.lastValue === undefined) {
        if (input.value === undefined) {
          return undefined;
        }
        G.lastValue = input.value;
      }
      input.ids.forEach((id) => {
        if (G.hand[ctx.currentPlayer][id] === undefined) {
          //Do nothing
        } else {
          var card = G.hand[ctx.currentPlayer][id];
          G.hand[ctx.currentPlayer].splice(id, 1);
          G.stack.push(card);
        }
      });

      G.lastPlayer = ctx.currentPlayer;
      G.lastNum = input.ids.length;
    },
    callOut: (G, ctx) => {
      var tempstack = [...G.stack];
      if (G.lastValue !== undefined) {
        if (hasLied(G)) {
          G.hand[G.lastPlayer] = [...G.hand[G.lastPlayer], ...tempstack];
        } else {
          G.hand[ctx.currentPlayer] = [
            ...G.hand[ctx.currentPlayer],
            ...tempstack,
          ];
        }
        G.stack = [];
        G.lastValue = undefined;
      } else {
        return undefined;
      }
      //If called correctly he should have a extra move
      //active players missing
    },
  },
  endIf: (G, ctx) => {
    if (G.hand.filter((playerhand) => playerhand.length > 0).length <= 1) {
      var endRanking = [...G.ranking, ctx.currentPlayer];
      return endRanking;
    }
  },
};

function hasLied(G) {
  var l1 =
    G.stack
      .splice(G.stack.length - G.lastNum, G.lastNum)
      .filter((ele) => hasValue(ele, G.lastSuit)).length !== G.lastNum;
  if (l1) {
    return true;
  } else {
    return false;
  }
}
function hasValue(card, value) {
  var regex = new RegExp(`^(?:(?!${value}).)*${value}(?!.*${value}).*$`);
  return regex.test(card);
}

const LiarGame = Client({
  game: Liar,
  numPlayers: 3,
  board: LiarUI,
  debug: false,
});

export default LiarGame;
