import React, { FC, useEffect, useState } from "react";
import axios from "axios";

import {
  IRoom,
  ISocketAndRoom,
  IUser,
  IUserMessage,
} from "../types/interfaces";
import "./online.css";

const Online: FC<ISocketAndRoom> = ({ socket, room }) => {
  const [userOnline, setUserOnline] = useState<IUser[]>([]);
  const [user, setUser] = useState<IUserMessage[]>([]);
  const [rooms, setRooms] = useState<IRoom>();
  const [socketsId, setSocketsId] = useState<any>();
  const [getSocketsId, setGetSocketId] = useState<any>();


  useEffect((): void => {
    getUsers();
    getRooms();
    getsoketId();
  }, []);

  useEffect(() => {
    disconnect();
  }, [socket]);

  useEffect((): void => {
    socket.on("newUserResponse", (data): void => {
      setUser(data);
    });
  }, [socket]);

  const getUsers = async (): Promise<void> => {
    const res = await axios.get("http://localhost:4000/api/user");
    setUserOnline(res.data.users);
  };

  const getRooms = async (): Promise<void> => {
    const res = await axios.get("http://localhost:4000/api/room");
    let a = res.data.arrRoom;
    setRooms(res.data.arrRoom[a.length - 1]);
  };

  const disconnect = () => {
    socket.on("usersDisconnect", (userId) => {
      setSocketsId(userId);
    });
  };


  const getsoketId = async (): Promise<void> => {
    const res = await axios.get("http://localhost:4000/api/socketId");

    setGetSocketId(res.data);
  };

console.log(1,user);
console.log(2,userOnline);


  
  

  return (
    <div
      className="formOnline"
      style={{
        background: room?.background || rooms?.background,
      }}
    >
      <div>
        {user.length ===0 ? (
          <div>
            {userOnline?.map((el: IUser) => {
              return (
                <div>
                  {el.room === rooms?.id ? (
                    <div>
                      <h1 className="onlineText">{el.user}</h1>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            {user.map((el: IUser) => {
              return (
                <div>
                  {el.room === rooms?.id ? (
                    <div>
                      <h1 className="onlineText">{el.user}</h1>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Online;
