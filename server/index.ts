import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { Server } from "socket.io";

import { IArrMessages, IArrRoom, IUser } from "./interface";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
const server = http.createServer(app);

const IO = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

app.use(cors({ origin: "http://localhost:5173" }));
 
const arrMessages: IArrMessages[] = [];
const arrRoom: IArrRoom[] = [];
const users: IUser[] = [];

IO.on("connection", (socket) => {
  console.log(`${socket.id} user connected`);

  socket.on("message", (data) => {
    arrMessages.push(data);
    IO.emit("response", arrMessages);
  });

  socket.on("room", (room) => {
    arrRoom.push(room);
    IO.emit("myRooms", arrRoom);
  });

  socket.on("deletElementForUser", (data) => {
    let index = users.indexOf(data);
    users.splice(index, 1);
    IO.emit("newUserResponse", users);
  });

  socket.on("newUser", (data) => {
    users.push(data);
    IO.emit("newUserResponse", users);
  });

  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnect`);
  });
});

app.get("/api", (req, res) => {
  res.json(arrMessages);
});

app.get("/api/room", (req, res) => {
  res.json(arrRoom);
});

app.get("/api/user", (req, res) => {
  res.json(users);
});

server.listen(PORT, () => {
  console.log(`server working on port ${PORT}`);
});
