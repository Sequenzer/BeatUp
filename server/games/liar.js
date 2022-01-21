// src/server.js
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const { Server, Origins } = require("boardgame.io/server");
import Liar from "../../client/src/games/Liar/Liar.js";

console.log(Liar);

var localreg = /localhost:\d+\/[(A-z)]+-[(A-z)]+-[(A-z)]+\/liar/g;

const gameServer = Server({
  games: [Liar],
  origins: [Origins.LOCALHOST, "https://yellow-emu-15-client.loca.lt"], //Temporary localhost:3000
});

export default gameServer;
