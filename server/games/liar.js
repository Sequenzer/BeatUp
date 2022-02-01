// src/server.js
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const { Server, Origins } = require("boardgame.io/server");
import Liar from "../../client/src/games/Liar/Liar.js";

var localreg = /localhost:\d+\/[(A-z)]+-[(A-z)]+-[(A-z)]+\/liar/g;
var onlinereg = "https://yellow-emu-15-client.loca.lt";

const gameServer = Server({
  games: [Liar],
  origins: [onlinereg], //Temporary localhost:3000,
});

export default gameServer;
