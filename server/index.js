// import express from "express";
// // import http from "http";
// // import morgan from "morgan";
// import * as socket from "socket.io";
// import { join, dirname } from "path";
// import { fileURLToPath } from "url";

// import { PORT } from "./config.js";
// import cors from "cors";

// Initializations
// const app = express();

const io = require("socket.io")(5000);

// // Middlewares
// app.use(cors());
// app.use(morgan("dev"));
// app.use(express.urlencoded({ extended: false }));

// app.use(express.static(join(__dirname, "../client/build")));

io.on("connection", (socket) => {
  const id = socket.handshake.query.id;
  let rooms = io.sockets.adapter.rooms;
  let room = rooms.get(id);

  if (room == undefined) {
    socket.join(id);
  } else if (room.size == 1) {
    socket.join(id);
    socket.emit("created");
  } else {
    socket.emit("full");
  }

  socket.on("send-move", (body) => {
    socket.broadcast.to(id).emit("receive-move", body);
  });
  socket.on("send-rematch", (body) => {
    socket.broadcast.to(id).emit("receive-rematch", body);
  });
  socket.on("accept-rematch", (body) => {
    socket.broadcast.to(id).emit("rematch-accepted", body);
  });
  socket.on("reject-rematch", (body) => {
    socket.broadcast.to(id).emit("rematch-rejected", body);
  });
  socket.on("joined", (body) => {
    socket.broadcast.to(id).emit("user-joined", body);
  });

  socket.on("left", (body) => {
    socket.broadcast.to(id).emit("user-left", body);
  });
});


