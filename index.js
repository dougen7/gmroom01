const http = require("http");
const express = require("express");

const colyseus = require("colyseus");
const ChatRoom = require('./ChatRoom');

const PORT = process.env.PORT || 8080;

const app = new express();
const gameServer = new colyseus.Server({
  server: http.createServer(app)
});

// Register ChatRoom as "chat"
gameServer.register("chat", ChatRoom);
gameServer.register("chat1", ChatRoom);
gameServer.register("chat2", ChatRoom);
gameServer.register("chat3", ChatRoom);
gameServer.register("chat4", ChatRoom);
gameServer.register("chat5", ChatRoom);
gameServer.register("chat6", ChatRoom);
gameServer.register("chat7", ChatRoom);
gameServer.register("chat8", ChatRoom);
gameServer.register("chat9", ChatRoom);

//
// GET response “o˜^
//
app.get("/something", function (req, res) {
  console.log("something!", process.pid);
  res.send("Hey!");
});

// Listen on specified PORT number
gameServer.listen(PORT);

console.log("Running on ws://localhost:" + PORT);
