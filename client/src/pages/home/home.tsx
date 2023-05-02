import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./home.css";
import { IProps, IRoom, IUser } from "../../types/interfaces";

const Home: FC<IProps> = ({ setRoom, socket }) => {
  const navigate: ReturnType<typeof useNavigate> = useNavigate();

  const [user, setUser] = useState<string>("");
  const [flag, setFlag] = useState<boolean>(false);
  const [users, setUsers] = useState<IUser[]>([]);
  const [redFlag, setRedFlag] = useState<boolean>(false);

  const random = Math.random();

  const room_namber: { id: number; background: string; roomId: string }[] = [
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

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    soketUser();
  }, [socket]);

  const getUsers = async (): Promise<void> => {
    const res = await axios.get("http://localhost:4000/api/user");
    setUsers(res.data);
  };

  const soketUser = () => {
    socket.on("newUserResponse", (data) => {
      setUsers(data);
    });
  };

  const room = async (el: IRoom): Promise<void> => {
    let isUserExist = false;
    const userData:string|null = localStorage.getItem("user");

    if (userData === null && user !== "") {
      users?.map((elm: IUser) => {
        if (elm.user === user) {
          setRedFlag(true);

          isUserExist = true;
        }
      });

      if (!isUserExist) {
        localStorage.setItem("user", user);
        setFlag(false);
        setRedFlag(false);

        roomCheck(el, user);
      }
    } else {
      setFlag(true);
      roomCheck(el, userData);
    }
  };

  const roomCheck = (el:IRoom, userData:string|null) => {

    setRoom(el);
    socket.emit("room", el);

    let isRoomExist = false;
    localStorage.setItem("room", el.roomId);

    users?.map((elm: IUser) => {
      if (elm.user === userData && elm.room === el.roomId) {
        isRoomExist = true;
      }
    });

    if (!isRoomExist) {
      socket.emit("newUser", {
        id: random,
        user: userData,
        socketId: socket.id,
        room: el.roomId,
      });
    }

    navigate("/chat");
  };

  const exit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div>
      <div className="home">
        <div className="homes">
          <div>
            {localStorage.getItem("user") === null ? (
              <div>
                {" "}
                <h3 className="userName">Name</h3>
                <input
                  type="text"
                  className="inputName"
                  placeholder="   writing the name is requird"
                  onChange={(e) => setUser(e.target.value)}
                />
                {flag ? (
                  <div>
                    {" "}
                    <h3 className="errorMessage">
                      writing the name is requird
                    </h3>
                  </div>
                ) : (
                  <div></div>
                )}
                {redFlag ? (
                  <div>
                    {" "}
                    <h3 className="errorMessage">
                      there is a person with this name ,choose your unique name
                    </h3>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            ) : (
              <div className="usreName">
                <h1 className="homeInput">{localStorage.getItem("user")}</h1>
                <button className="buttonExit" onClick={exit}>
                  Exit
                </button>
              </div>
            )}
          </div>
          {}
        </div>

        <div className="roomsel">
          {room_namber.map((el, index) => (
            <div key={index}>
              <button
                className="buttonRooms"
                style={{
                  background: el.background,
                }}
                onClick={() => room(el)}
              >
                room {el.roomId}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
