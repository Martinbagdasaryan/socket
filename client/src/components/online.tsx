import axios from "axios";
import React, { FC, useEffect, useState } from "react";


import "./online.css";
import { ISocketAndRoomAndUser, IUser } from "../types/interfaces";

const Online: FC<ISocketAndRoomAndUser> = ({
  user,
  room,
  userOnline,
  roomID,
}) => {
  return (
    <div
      className="form-online"
      style={{
        background: room?.background || roomID?.background,
      }}
    >
      <div>
        {user.length === 0 ? (
          <div>
            {userOnline?.map((el: IUser, index) => {
              return (
                <div key={index}>
                  {el.room === roomID?.roomId ? (
                    <div>
                      <h1 className="online-text">{el.user}</h1>
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
                  {el.room === roomID?.roomId ? (
                    <div>
                      <h1 className="online-text">{el.user}</h1>
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
