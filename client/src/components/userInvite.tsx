import React, { FC, useState } from "react";
import { IModal, IUser } from "../types/interfaces";

import "./userInvite.css";

const UserInvait: FC<IModal> = ({  userElement, index, socket }) => {
  const [invaitUser, setInvaitUser] = useState<boolean>(false);
  
  const userInvite = (el: IUser) => {
    socket.emit("inviteUser", {
      id:el.id,
      user:el.user,
      socketId:el.socketId,
      room:el.room,
      IUser:localStorage.getItem("user"),
      IRoom:localStorage.getItem("room")
    });
    setInvaitUser(true)
  };

  return (
    <div className="user-name-and-button    ">
      {userElement.room === localStorage.getItem("room") ? (
        <div>
        </div>
      ) : (
        <div key={index}>
          <React.Fragment key={index}>
            <div>
              {invaitUser ? (
                <div className="name-buttons">
                  <p>you invited to the room</p>
                  <h4 className="text-name">{userElement.user}</h4>
                </div>
              ) : (
                <div className="name-button">
                  <h2 className="text-name">{userElement.user}</h2>
                  <button className="button-ivite" onClick={()=>userInvite(userElement)} >
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
