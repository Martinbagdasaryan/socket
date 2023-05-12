import React, { FC, useEffect, useState } from "react";
import { IModal, IUser } from "../types/interfaces";

import "./userInvite.css";
import { store } from "../redux/reduxStor"

const UserInvait: FC<IModal> = ({ userElement, index, socket }) => {
  const [inviteUser, setInvaitUser] = useState<boolean>(false);
  const localRoom = store.getState().room.room
  const localName =store.getState().name.name
  
  useEffect(() => {
    socket.on("invite", (data) => {
      setInvaitUser(data);
    });
  }, [socket]);

  const userInvite = (el: IUser) => {
    socket.emit("inviteUser", {
      id: el.id,
      user: el.user,
      socketId: el.socketId,
      room: el.room,
      IUser: localName,
      IRoom: localRoom,
    });
    setInvaitUser(true);
  };

  return (
    <div className="user-name-and-button    ">
      {userElement.room === localRoom ? (
        <div></div>
      ) : (
        <div key={index}>
          <React.Fragment key={index}>
            <div>
              {inviteUser ? (
                <div className="name-buttons">
                  <p>you invited to the room</p>
                  <h4 className="text-name">{userElement.user}</h4>
                </div>
              ) : (
                <div className="name-button">
                  <h2 className="text-name">{userElement.user}</h2>
                  <button
                    className="button-ivite"
                    onClick={() => userInvite(userElement)}
                  >
                    invait room
                  </button>
                </div>
              )}
            </div>
          </React.Fragment>
        </div>
      )}
    </div>
  );
};

export default UserInvait;
