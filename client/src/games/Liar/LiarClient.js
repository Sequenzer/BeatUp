import Liar from "./Liar.js";
import LiarUI from "./LiarUI.js";
import { Client } from "boardgame.io/react";
import { SocketIO } from "boardgame.io/multiplayer";

const LiarGame = Client({
  game: Liar,
  board: LiarUI,
  multiplayer: SocketIO({
    server: "https://yellow-emu-15-games.loca.lt",
    socketOpts: {
      transports: ["websocket"],
    },
  }),
  playerID: "playerID",
  matchID: "matchID",
  credentials: "credentials",
});

export default LiarGame;
