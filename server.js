import dotenv from "dotenv";

import { createRequire } from "module";
const require = createRequire(import.meta.url);

import localtunnel from "localtunnel";

import registerLobbyhandlers from "./server/lobby.js";

import gameServer from "./server/gameServer.js";

dotenv.config();
const port = process.env.PORT || 5000;
const gamePort = 4000;

const io = require("socket.io")(port);

(async () => {
  const tunnel = await localtunnel({
    port: 3000,
    subdomain: "yellow-emu-15-client",
  });

  // the assigned public url for your tunnel
  // i.e. https://abcdefgjhij.localtunnel.me
  console.log(tunnel.url);

  tunnel.on("close", () => {
    // tunnels are closed
  });
})();

(async () => {
  const tunnel = await localtunnel({
    port: port,
    subdomain: "yellow-emu-15-server",
  });

  // the assigned public url for your tunnel
  // i.e. https://abcdefgjhij.localtunnel.me
  console.log(tunnel.url);

  tunnel.on("close", () => {
    // tunnels are closed
  });
})();
(async () => {
  const tunnel = await localtunnel({
    port: gamePort,
    subdomain: "yellow-emu-15-games",
  });

  // the assigned public url for your tunnel
  // i.e. https://abcdefgjhij.localtunnel.me
  console.log(tunnel.url);

  tunnel.on("close", () => {
    // tunnels are closed
  });
})();

//Track users and rooms

//Register handler for a new user

const onConnect = (socket) => {
  console.log("New user connected", socket.id);
  registerLobbyhandlers(io, socket);
};

io.on("connection", onConnect);

//Run Game Server

gameServer.run(gamePort);

//app.listen(port, () => console.log(`Server started on Port ${port}`));
