import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { Server } from "socket.io";

import {  IMessagesList, IRoomList, IUserList } from "./interface";

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

const messagesList: IMessagesList[] = [];
const roomList: IRoomList[] = [];
const UsersList: IUserList[] = [];

IO.on("connection", (socket) => {
  console.log(`${socket.id} user connected`);

  socket.on("message", (data) => {
    messagesList.push(data);
    IO.emit("response", messagesList);
  });

  socket.on("room", (room) => {
    roomList.push(room);

    IO.emit("myRooms", roomList);
  });

  socket.on("deletElementForUser", (data) => {
    const usersIndex = UsersList.findIndex((user) => user.id === data.id);
    UsersList.splice(usersIndex, 1);

    const roomIndex = roomList.findIndex((room) => room.id === data.id);
    roomList.splice(roomIndex, 1);

    IO.emit("newUserResponse", UsersList);
  });

  socket.on("newUser", (data) => {
    UsersList.push(data);

    IO.emit("newUserResponse", UsersList);
  });
  socket.on("inviteUser", (data) => {
    IO.emit("getInvite", data);
  });

  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnect`);
  });
});

app.get("/api", (req, res) => {
  res.json(messagesList);
});

app.get("/api/room", (req, res) => {
  res.json(roomList);
});

app.get("/api/user", (req, res) => {
  res.json(UsersList);
});

server.listen(PORT, () => {
  console.log(`server working on port ${PORT}`);
});
