import axios from "axios";
import { useNavigate } from "react-router";
import React, { useState, useEffect, FC } from "react";

import "./chat.css";
import Online from "../../components/online";
import MessagBox from "../../components/messagBox";
import MesssagInpute from "../../components/messagInput";
import {
  IArrMessages,
  IRoom,
  ISocketAndRoom,
  IUser,
} from "../../types/interfaces";

const ChatPage: FC<ISocketAndRoom> = ({ socket, room }) => {
  const navigate: ReturnType<typeof useNavigate> = useNavigate();

  const [user, setUser] = useState<IUser[]>([]);
  const [roomID, setRoomID] = useState<IRoom>();
  const [userOnline, setUserOnline] = useState<IUser[]>([]);
  const [message, setMessage] = useState<IArrMessages[]>([]);

  useEffect((): void => {
    socket.on("response", (data: IArrMessages[]): void => {
      setMessage(data);
    });
  }, [socket, message]);

  useEffect(() => {
    getRooms();
    getUsers();
  }, []);

  useEffect((): void => {
    socket.on("newUserResponse", (data): void => {
      setUser(data);
    });
  }, [socket]);

  const getUsers = async (): Promise<void> => {
    const res = await axios.get("http://localhost:4000/api/user");
    setUserOnline(res.data);
  };

  const deletUserOnline = ():void => {
    userOnline.map((el: IUser) => {
      if (
        el.user === localStorage.getItem("user") &&
        el.room === localStorage.getItem("room")
      ) {
        socket.emit("deletElementForUser", el);
      }
    });
  };
  
  const deletUser = ():void => {
    user.map((el: IUser) => {
      if (
        el.user === localStorage.getItem("user") &&
        el.room === localStorage.getItem("room")
      ) {
        socket.emit("deletElementForUser", el);
      }
    });
  };

  const handleleave: React.MouseEventHandler<HTMLButtonElement> = (): void => {
    if (!user || user.length === 0) {
      deletUserOnline();
      localStorage.removeItem("room");
      localStorage.removeItem("user");
      navigate("/");
    } else {
      deletUser();
      localStorage.removeItem("room");
      localStorage.removeItem("user");
      navigate("/");
    }
  };

  const rooms: React.MouseEventHandler<HTMLButtonElement> = (): void => {
    if (!user || user.length === 0) {
      deletUserOnline();
      localStorage.removeItem("room");
      navigate("/");
    } else {
      deletUser();
      localStorage.removeItem("room");
      navigate("/");
    }
  };

  const getRooms: Function = async (): Promise<void> => {
    const res = await axios.get("http://localhost:4000/api/room");
    let room = res.data;
    setRoomID(res.data[room.length - 1]);
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
            room{room?.roomId || roomID?.roomId}
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
