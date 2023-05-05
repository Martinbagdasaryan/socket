import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import React, { FC, useEffect, useState } from "react";

import "./invite.css";
import { IInvite, IRoom } from "../types/interfaces";

const Invite: FC<IInvite> = ({
  socket,
  getInvate,
  deletUserOnline,
  setSocketInvite,
  socketInvite,
}) => {
  const navigate: ReturnType<typeof useNavigate> = useNavigate();

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const random = Math.random();

  const roomList: IRoom[] = [
    {
      id: random,
      roomId: "1",
      background: "rgb(174 255 225)",
    },
    {
      id: random,
      roomId: "2",
      background: "rgb(255 146 232)",
    },
    {
      id: random,
      roomId: "3",
      background: "rgb(254 255 174)",
    },
    {
      id: random,
      roomId: "4",
      background: "rgb(174 229 255)",
    },
  ];

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      background: "rgb(119 144 225)",
      transform: "translate(-50%, -50%)",
      minWidth: "400px",
    },
  };

  useEffect(() => {
    setModalIsOpen(true);
  }, [getInvate]);

  const closeModal = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    const filterInvite = socketInvite.filter((el) => {
      return (
        el.user !== localStorage.getItem("user") &&
        el.room !== localStorage.getItem("room")
      );
    });

    socket.emit("inviteBoolean", false);

    setSocketInvite(filterInvite);
  };

  const enterRoom = async (): Promise<void> => {
    getInvate.map((element) => {
      if (
        element.user === localStorage.getItem("user") &&
        element.room === localStorage.getItem("room")
      ) {
        deletUserOnline();
        roomList.map((el) => {
          if (el.roomId === element.IRoom) {
            socket.emit("room", el);
          }
        });

        socket.emit("newUser", {
          id: random,
          user: localStorage.getItem("user"),
          socketId: socket.id,
          room: element.IRoom,
        });

        navigate("/");
        localStorage.setItem("room", element.IRoom);
      }
    });

    await navigate("/chat");

    setModalIsOpen(false);
    window.location.reload();
  };

  return (
    <div>
      <Modal isOpen={modalIsOpen} style={customStyles}>
        <div>
          {getInvate.map((el, index) => {
            return (
              <div key={index}>
                {el.user === localStorage.getItem("user") ? (
                  <div>
                    <h1>
                      {el.IUser} invites {el.IRoom} room{" "}
                    </h1>

                    <div className="buttons-invite">
                      <button className="button-fird" onClick={closeModal}>
                        fired
                      </button>
                      <button className="button-enter" onClick={enterRoom}>
                        enter
                      </button>
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            );
          })}
        </div>
      </Modal>
    </div>
  );
};

export default Invite;
