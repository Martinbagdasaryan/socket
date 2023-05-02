import axios from "axios";
import React, { FC, useEffect, useState } from "react";

import "./online.css";
import {
  IRoom,
  ISocketAndRoom,
  IUser,
  IUserMessage,
} from "../types/interfaces";

const Online: FC<ISocketAndRoom> = ({ socket, room }) => {
  
  const [rooms, setRooms] = useState<IRoom>();
  const [user, setUser] = useState<IUserMessage[]>([]);
  const [userOnline, setUserOnline] = useState<IUser[]>([]);

  useEffect((): void => {
    getUsers();
    getRooms();
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

  const getRooms = async (): Promise<void> => {
    const res = await axios.get("http://localhost:4000/api/room");
    let a = res.data;
    setRooms(res.data[a.length - 1]);
  };

  return (
    <div
      className="formOnline"
      style={{
        background: room?.background || rooms?.background,
      }}
    >
      <div>
        {user.length === 0 ? (
          <div>
            {userOnline?.map((el: IUser, index) => {
              return (
                <div key={index}>
                  {el.room === rooms?.roomId ? (
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
            {user.map((el: IUser, index) => {
              return (
                <div key={index}>
                  {el.room === rooms?.roomId ? (
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
