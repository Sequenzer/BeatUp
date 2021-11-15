import { Client } from "boardgame.io/react";
import InternationalUI from "./InternationalUI";

//Table
//Example Seats [0,1,2,3]

//create a deck with 12 coutntries with each 4 man and 4 women
const countries = [
  "DEU",
  "IND",
  "FRA",
  "ITA",
  "USA",
  "ESP",
  "CHN",
  "RUS",
  "CAF",
  "GBR",
  "TUR",
  "CUB",
];
const gender = ["m", "f"];
var deck = [];
countries.forEach((country) => {
  gender.forEach((gender) => {
    Array(4)
      .fill(1)
      .forEach((num) => {
        deck.push({
          country: country,
          gender: gender,
        });
      });
  });
});
var countrydeck = [];
countries.forEach((country) => {
  countrydeck.push(country);
  countrydeck.push(country);
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
var shuffledDeck = shuffle(deck);
var shuffledtable = shuffle(countrydeck);
console.log(shuffledDeck);

var seating = [
  {
    card: undefined,
    tables: [0],
  },
  {
    card: undefined,
    tables: [1],
  },
  {
    card: undefined,
    tables: [0],
  },
  {
    card: undefined,
    tables: [0, 1, 2],
  },
  {
    card: undefined,
    tables: [1],
  },
  {
    card: undefined,
    tables: [0, 2, 3],
  },
  {
    card: undefined,
    tables: [1, 2, 4],
  },
  {
    card: undefined,
    tables: [3],
  },
  {
    card: undefined,
    tables: [2, 3, 4],
  },
  {
    card: undefined,
    tables: [4],
  },
  {
    card: undefined,
    tables: [3],
  },
  {
    card: undefined,
    tables: [4],
  },
];
console.log(seating);

const International = {
  setup: (ctx) => {
    return {
      deck: ["hello"],
      test: shuffledDeck,
      tabledeck: shuffledtable,
      hand: Array(ctx.numPlayers).fill([]),
      points: Array(ctx.numPlayers).fill(0),
      tables: Array(4).fill(1),
      seats: seating,
    };
  },
  phases: {
    dealCards: {
      start: true,
      next: "play",
      onBegin: (G, ctx) => {
        //Deal hand
        G.hand.forEach((hand) => {
          Array(7)
            .fill(1)
            .forEach((num) => {
              hand.push(G.deck.pop());
            });
        });
        //Deal tables
        G.tables = G.tables.map((table) => {
          return G.tabledeck.pop();
        });
        ctx.events.endPhase();
      },
    },
    play: {
      moves: {
        //Play cards
        // Example: {card: 2,seat: 3}
        playCard: (G, ctx, { cardToPlay, seat }) => {
          G.seats[seat].card = G.hand[ctx.currentPlayer].splice(
            cardToPlay - 1,
            1
          )[0];
        },
      },
    },
  },
  //Game logic
  getNumberGender(table, gender) {
    return table.seats.filter((seat) => {
      return seat.person.gender === gender;
    }).length;
  },
  isCorrectCountry(table) {
    return (
      table.seats.filter((seat) => seat.person.country !== table.country)
        .length === 0
    );
  },
  //DO something
};

const InternationalGame = Client({
  game: International,
  board: InternationalUI,
  debug: false,
});

export default InternationalGame;
