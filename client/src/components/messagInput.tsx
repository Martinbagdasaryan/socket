import axios from "axios";
import React, { FC, MouseEventHandler, useEffect, useState } from "react";

import "./messagInput.css";
import { IRoom, ISocketAndRoom } from "../types/interfaces";

const MesssagInpute: FC<ISocketAndRoom> = ({ socket }) => {
  
  const [message, setMessage] = useState<string>("");
  const [socketRoom, setSocketRoom] = useState<IRoom>();

  useEffect((): void => {
    getRooms();
  }, []);

  const getRooms: Function = async (): Promise<void> => {
    const res = await axios.get("http://localhost:4000/api/room");
    let roomData = res.data;
    setSocketRoom(res.data[roomData.length - 1]);
  };

  const handleSend: MouseEventHandler<HTMLButtonElement> = (
    e: React.SyntheticEvent
  ): void => {
    e.preventDefault();
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const formattedTime = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
    if (message.trim() && localStorage.getItem("user")) {
      socket.emit("message", {
        id: `${socket.id}`,
        socketID: socket.id,
        roomI: socketRoom,
        text: message,
        name: localStorage.getItem("user"),
        data: formattedTime ,
      });
    }
    setMessage("");
  };
  
  
  return (
    <div>
      <form className="forms">
        <input
          className="input"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="button"
          style={{
            background: socketRoom?.background,
          }}
          onClick={handleSend}
        >
          send
        </button>
      </form>
    </div>
  );
};

export default MesssagInpute;
