const express = require("express");

const port = process.env.PORT || 5000;
const app = express();

const io = require("socket.io")(port);

io.on("connection", function (socket) {
  console.log("a user connected");
});

//app.listen(port, () => console.log(`Server started on Port ${port}`));
