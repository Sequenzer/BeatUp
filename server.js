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
(async () => {
  const tunnel = await localtunnel({
    port: 5000,
    subdomain: "yellow-emu-15-server",
  });

  // the assigned public url for your tunnel
  // i.e. https://abcdefgjhij.localtunnel.me
  console.log(tunnel.url);

  tunnel.on("close", () => {
    // tunnels are closed
  });
})();

const io = require("socket.io")(port);

var users = [];
var rooms = [];

io.on("connection", function (socket) {
  console.log("a user connected", socket.id);
  socket.on("joinRoom", ({ username, room }) => {
    var user = join_user(socket.id, username, room);
    socket.join(user.room);
    socket.emit("message", {
      user: user.username,
      text: `Welcome "${user.username}"`,
    });
    socket.broadcast
      .to(user.room)
      .emit("newUser", { user: user.username, text: "has joined" });
  });
  socket.on("chat", (text) => {
    var user = getById(socket.id);
    socket.broadcast.to(user.room).emit("message", {
      user: user.username,
      text: text,
    });
  });
  socket.on("requestUsers", ({ room }) => {
    var user = getById(socket.id);
    socket.emit(
      "users",
      users.filter((user) => user.room === room)
    );
  });
  socket.on("requestStart", ({ game, room }) => {
    console.log("requestStart", game, room);
    io.to(room).emit("gameStarts", { game });
  });
  socket.on("disconnect", () => {
    var user = getById(socket.id);
    if (user) {
      io.to(user.room).emit("userLeft", {
        user: user.username,
        text: "has left",
      });
      remove_user(socket.id);
    }
  });
  function join_user(id, username, room) {
    socket.join(room);
    users.push({
      id: id,
      username: username,
      room: room,
    });
    return {
      id: id,
      username: username,
      room: room,
    };
  }
});

function getById(id) {
  var user = users.find((user) => user.id === id);
  return user;
}
function remove_user(id) {
  var user = getById(id);
  if (user) {
    users = users.filter((user) => user.id !== id);
  }
  return user;
}

//app.listen(port, () => console.log(`Server started on Port ${port}`));
