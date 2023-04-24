import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const PORT = 4000;

const IO = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

app.use(cors({ origin: "http://localhost:5173" }));

IO.on("connection", (socket) => {
  console.log(`${socket.id} user connected`);

  socket.on("message", (data) => {
    IO.emit("response", data);
  });

  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnect`);
  });
});

app.get("/api", (req, res) => {
  res.json({
    message: "Hello world",
  });
});
server.listen(PORT, () => {
  console.log(`server working on port ${PORT}`);
});
