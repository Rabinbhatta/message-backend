import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

const PORT = process.env.PORT || 4000;

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("sendMessage", (message, sender) => {
    console.log(`Message from ${sender}: ${message}`);
    io.emit("receiveMessage", { message, sender });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
