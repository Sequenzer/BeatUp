var users = []; // Wrong Position:
var rooms = [];

const registerLobbyhandlers = (io, socket) => {
  //util functions

  function join_user(id, username, room) {
    console.log("User joined", id, username, room);
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
  function getById(id) {
    var user = users.find((user) => user.id === id);
    return user;
  }
  function remove_user(id) {
    var userToRemove = getById(id);
    if (userToRemove) {
      users = users.filter((user) => user.id !== id);
    }
    return userToRemove;
  }
  function getUserInRoom(room) {
    var usersInRoom = users.filter((user) => user.room === room);
    return usersInRoom;
  }

  const userMessage = (text) => {
    var user = getById(socket.id);
    socket.broadcast.to(user.room).emit("message", {
      user: user.username,
      text: text,
    });
  };
  const requestUsers = ({ room }) => {
    var user = getById(socket.id);
    var usersInRoom = getUserInRoom(room);
    socket.emit("users", { usersInRoom });
  };
  const requestStart = ({ game, room, matchID }) => {
    console.log("Game: " + game + " Room: " + room + " MatchID: " + matchID);
    users
      .filter((user) => user.room === room)
      .forEach((user, index) => {
        var playerID = `${index}`;
        io.to(user.id).emit("gameStarts", { game, matchID, playerID });
      });
  };
  const joinRoom = ({ username, room }) => {
    var user = join_user(socket.id, username, room);
    var usersInRoom = getUserInRoom(room);

    socket.emit("message", {
      user: user.username,
      text: `Welcome "${user.username}"`,
    });
    socket.emit("joinedRoom", {
      room: user.room,
      usersInRoom: usersInRoom,
    });
    socket.broadcast.to(user.room).emit("userChange", {
      user: user.username,
      text: "has joined",
      usersInRoom: usersInRoom,
    });
  };
  const disconnect = () => {
    var user = getById(socket.id);
    console.log("user disconnected", socket.id);
    if (user) {
      remove_user(socket.id);
      var usersInRoom = getUserInRoom(user.room);
      io.to(user.room).emit("userChange", {
        user: user.username,
        text: "has left",
        usersInRoom: usersInRoom,
      });
    }
  };

  socket.on("userMessage", userMessage);
  socket.on("requestUsers", requestUsers);
  socket.on("requestStart", requestStart);
  socket.on("joinRoom", joinRoom);
  socket.on("disconnect", disconnect);
};

export default registerLobbyhandlers;
