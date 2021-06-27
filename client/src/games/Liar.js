import { Client } from "boardgame.io/react";
import StyledLiarUI from "./LiarUI.js";

const Liar = {
  setup: () => ({ cells: Array(9).fill(null) }),
};
const LiarGame = Client({
  game: Liar,
  board: StyledLiarUI,
  debug: false,
});

export default LiarGame;
