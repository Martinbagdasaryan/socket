import * as io from "socket.io-client";
import React, { FC, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./global.css";
import Home from "./pages/home/home";
import ChatPage from "./pages/chat/chat";
import { IRoom } from "./types/interfaces";

const socket: io.Socket = io.connect("http://localhost:4000");

const App: FC = () => {
  const [room, setRoom] = useState<IRoom | undefined>();

  return (
    <Routes>
      <Route path="/" element={<Home setRoom={setRoom} socket={socket} />} />
      <Route path="/chat" element={<ChatPage socket={socket} room={room!} />} />
    </Routes>
  );
};

export default App;
