import React, { useState, useEffect, FC } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

import MessagBox from "../../components/messagBox";
import MesssagInpute from "../../components/messagInput";
import Online from "../../components/online";
import "./chat.css";
import { IArrMessages, IRoom, ISocketAndRoom } from "../../types/interfaces";

const ChatPage: FC<ISocketAndRoom> = ({ socket, room }) => {
  const navigate: ReturnType<typeof useNavigate> = useNavigate();

  const [message, setMessage] = useState<IArrMessages[]>([]);
  const [roomID, setRoomID] = useState<IRoom>();

  useEffect((): void => {
    socket.on("response", (data: IArrMessages[]): void => {
      setMessage(data);
    });
  }, [socket, message]);

  useEffect(() => {
    roomsget();
  }, []);

  const handleleave: React.MouseEventHandler<HTMLButtonElement> = (): void => {
    localStorage.removeItem("room");
    localStorage.removeItem("user");
    navigate("/");
  };

  const rooms: React.MouseEventHandler<HTMLButtonElement> = (): void => {
    localStorage.removeItem("room");
    navigate("/");
  };

  const roomsget: Function = async (): Promise<void> => {
    const res = await axios.get("http://localhost:4000/api/room");
    let a = res.data.arrRoom;
    setRoomID(res.data.arrRoom[a.length - 1]);
  };

  return (
    <div style={{ background: "#e9e9e9" }}>
      <header className="header">
        <button className="button" onClick={rooms}>
          {" "}
          rooms
        </button>
        <button className="button" onClick={handleleave}>
          Exit
        </button>
      </header>
      <div>
        <div className="rooms">
          <h1
            style={{
              color: room?.background || roomID?.background,
            }}
          >
            room{room?.id || roomID?.id}
          </h1>
        </div>
        <main className="chats">
          <Online socket={socket} room={room} />
          <MessagBox message={message} />
        </main>
        <MesssagInpute socket={socket} room={room} />
      </div>
    </div>
  );
};

export default ChatPage;
