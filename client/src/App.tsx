import * as io from "socket.io-client";
import React, { FC, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/home/home";
import ChatPage from "./pages/chat/chat";
import "./global.css";

const socket: io.Socket = io.connect("http://localhost:4000");

const App: FC = () => {
  const [room, setRoom] = useState<
    { id: string; background: string } | undefined
  >();
  return (
    <Routes>
      <Route path="/" element={<Home setRoom={setRoom} socket={socket} />} />
      <Route path="/chat" element={<ChatPage socket={socket} room={room!} />} />
    </Routes>
  );
};

export default App;
