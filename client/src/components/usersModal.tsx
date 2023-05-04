import Modal from "react-modal";
import React, { FC, useState } from "react";

import "./userModal.css";
import UserInvait from "./userInvite";
import { ISocketAndUser, IUser } from "../types/interfaces";

const UserModal: FC<ISocketAndUser> = ({ userOnline, socket, user }) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      // marginRight: "-50%",
      background: "rgb(119 144 225)",
      transform: "translate(-50%, -50%)",
      minWidth: "400px",
      maxHeight: '250px'
    },
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <div>
        <button className="button-user" onClick={openModal}>
          users
        </button>
      </div>
      <div>
        {user.length === 0 ? (
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
          >
            {userOnline.map((userElement: IUser, index: number) => {
              return (
                <div key={index}>
                  <UserInvait
                    userElement={userElement}
                    index={index}
                    socket={socket}
                  />
                </div>
              );
            })}
            <footer>
              <div className="button-close-div">
                <button className="button-close" onClick={closeModal}>
                  close
                </button>
              </div>
            </footer>
          </Modal>
        ) : (
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
          >
            {user.map((userElement: IUser, index: number) => {
              return (
                <div>
                  <UserInvait
                    userElement={userElement}
                    index={index}
                    socket={socket}
                  />
                </div>
              );
            })}
            <footer>
              <div className="button-close-div">
                <button className="button-close" onClick={closeModal}>
                  close
                </button>
              </div>
            </footer>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default UserModal;
