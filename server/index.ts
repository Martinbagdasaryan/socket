import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

import { IArrMessages, IArrRoom, IUser } from "./interface";

const app = express();
const server = http.createServer(app);
const PORT = 4000;

const IO = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

app.use(cors({ origin: "http://localhost:5173" }));

const arrMessages: IArrMessages[] = [];
const arrRoom: IArrRoom[] = [];
const users: IUser[] = [];
const socketId: any = [];

IO.on("connection", (socket) => {
  console.log(`${socket.id} user connected`);

  socket.on("message", (data) => {
    arrMessages.push(data);

    IO.emit("response", arrMessages);
  });

  socket.on("room", (room) => {
    arrRoom.push(room);
  });

  socket.on("newUser", (data) => {
    users.push(data);

    IO.emit("newUserResponse", users);
  });

  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnect`);
    socketId.push(`${socket.id}`)
    IO.emit("usersDisconnect",socket.id)
  });
});

app.get("/api", (req, res) => {
  res.json({
    arr: arrMessages,
  });
});

app.get("/api/room", (req, res) => {
  res.json({
    arrRoom,
  });
});

app.get("/api/user", (req, res) => {
  res.json({
    users,
  });
});

app.get("/api/socketId",(req,res)=>{
  res.json(socketId)
})
server.listen(PORT, () => {
  console.log(`server working on port ${PORT}`);
});
