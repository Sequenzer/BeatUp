const express = require("express");

const localtunnel = require("localtunnel");

const port = process.env.PORT || 5000;
const app = express();

(async () => {
  const tunnel = await localtunnel({ port: 3000, subdomain: "yellow-emu-15" });

  // the assigned public url for your tunnel
  // i.e. https://abcdefgjhij.localtunnel.me
  console.log(tunnel.url);

  tunnel.on("close", () => {
    // tunnels are closed
  });
})();

const io = require("socket.io")(port);

io.on("connection", function (socket) {
  console.log("a user connected");
});

//app.listen(port, () => console.log(`Server started on Port ${port}`));
