import { Routes,Route } from 'react-router-dom';
import Home from './components/home/home';
import ChatPage from './components/chat/index'
import * as io from "socket.io-client";
import React from 'react';


const  socket  = io.connect("http://localhost:4000");

function App() {
  
  return (
    <Routes>
      <Route path='/' element={<Home  />} />
      <Route path='/chat' element={<ChatPage socket={socket}  />} />
    </Routes>
  )
}

export default App
