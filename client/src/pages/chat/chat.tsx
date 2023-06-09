import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import React, { useState, useEffect, FC } from "react";

import "./chat.css";
import Online from "../../components/online";
import Invite from "../../components/invite";
import { store } from "../../redux/reduxStor";
import UserModаl from "../../components/usersModal";
import MessagBox from "../../components/messagBox";
import MesssagInpute from "../../components/messagInput";
import {
  IArrMessages,
  IChat,
  IInvateUser,
  IRoom,
  IUser,
} from "../../types/interfaces";

const ChatPage: FC<IChat> = ({ socket, room }) => {
  const dispatch = useDispatch();

  const navigate: ReturnType<typeof useNavigate> = useNavigate();
  const localRoom = store.getState().room.room;
  const localName = store.getState().name.name;

  const [user, setUser] = useState<IUser[]>([]);
  const [roomID, setRoomID] = useState<IRoom>();
  const [userOnline, setUserOnline] = useState<IUser[]>([]);
  const [message, setMessage] = useState<IArrMessages[]>([]);
  const [socketInvite, setSocketInvite] = useState<IInvateUser[]>([]);

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

    socket.on("getInvite", (data) => {
      setSocketInvite((prev) => [...prev, data]);
    });
  }, [socket]);

  const getUsers = async (): Promise<void> => {
    const res = await axios.get("http://localhost:4000/api/user");
    setUserOnline(res.data);
  };

  const deletUserOnline = (): void => {
    userOnline.map((el: IUser) => {
      if (el.user === localName && el.room === localRoom) {
        socket.emit("deletElementForUser", el);
      }
    });
  };

  const deletUser = (): void => {
    user.map((el: IUser) => {
      if (el.user === localName && el.room === localRoom) {
        socket.emit("deletElementForUser", el);
      }
    });
  };

  const handleleave: React.MouseEventHandler<HTMLButtonElement> = (): void => {
    if (user.length === 0) {
      deletUserOnline();
      dispatch({ type: "ADDROOM", payload: "" });
      dispatch({ type: "ADDNAME", payload: "" });
      navigate("/");
    } else {
      deletUser();
      dispatch({ type: "ADDROOM", payload: "" });
      dispatch({ type: "ADDNAME", payload: "" });
      navigate("/");
    }
  };

  const rooms: React.MouseEventHandler<HTMLButtonElement> = (): void => {
    if (user.length === 0) {
      deletUserOnline();
      dispatch({ type: "ADDROOM", payload: "" });
      navigate("/");
    } else {
      deletUser();
      dispatch({ type: "ADDROOM", payload: "" });
      navigate("/");
    }
  };

  const getRooms: Function = async (): Promise<void> => {
    const res = await axios.get("http://localhost:4000/api/room");
    res.data.map((el: IRoom) => {
      if (el.roomId === localRoom) {
        setRoomID(el);
      }
    });
  };

  return localRoom ? (
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
          <div>
            <UserModаl socket={socket} userOnline={userOnline} user={user} />
          </div>
        </div>
        <div>
          {socketInvite ? (
            socketInvite.map((el, index) => {
              return (
                <div key={index}>
                  {el.user === localName? (
                    <div>
                      <Invite
                        socket={socket}
                        getInvate={socketInvite}
                        deletUserOnline={deletUserOnline}
                        setSocketInvite={setSocketInvite}
                        socketInvite={socketInvite}
                      />
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              );
            })
          ) : (
            <div></div>
          )}
        </div>
        <main className="chats">
          <Online
            socket={socket}
            room={room}
            userOnline={userOnline}
            roomID={roomID}
            user={user}
          />
          <MessagBox message={message} roomID={roomID} />
        </main>
        <MesssagInpute socket={socket} room={room} roomID={roomID} />
      </div>
    </div>
  ) : (
    <>{navigate("/")}</>
  );
};

export default ChatPage;
