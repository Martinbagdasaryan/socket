import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./home.css";
import { IProps, IRoom, IUser } from "../../types/interfaces";

const Home: FC<IProps> = ({ setRoom, socket }) => {
  const navigate: ReturnType<typeof useNavigate> = useNavigate();

  const [user, setUser] = useState<string>("");
  const [incorrectlyTypedName, setIncorrectlyTypedName] = useState<boolean>(false);
  const [users, setUsers] = useState<IUser[]>([]);
  const [rName, setRName] = useState<boolean>(false);

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

  useEffect(() => {
    getUsersList();
  }, []);

  useEffect(() => {
    socketUser();
  }, [socket]);

  const getUsersList = async (): Promise<void> => {
    const responsUserList = await axios.get("http://localhost:4000/api/user");
    setUsers(responsUserList.data);
  };

  const socketUser = () => {
    socket.on("newUserResponse", (data) => {
      setUsers(data);
    });
  };
  
  const room = async (el: IRoom): Promise<void> => {
    let isUserExist = false;
    const userData: string | null = localStorage.getItem("user");

    if ( user!==''  ) {
      if(userData === null ){
        users?.map((elm: IUser) => {
          if (elm.user === user) {
            setRName(true);
            isUserExist = true;
          }
        });
        if (!isUserExist) {
          
          localStorage.setItem("user", user);
          setIncorrectlyTypedName(false);
          setRName(false);
  
          roomCheck(el, user);
        }
      }
      
    } else  {
      if(userData!==null){
        roomCheck(el, userData);
      }
      else{
        setIncorrectlyTypedName(true);}
      }
  };
  
  const roomCheck = (el: IRoom, userData: string | null) => {
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
      navigate("/chat");
    }
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
                <h3 className="user-names">Name</h3>
                <input
                  type="text"
                  className="input-name"
                  placeholder="   writing the name is requird"
                  onChange={(e) => setUser(e.target.value)}
                />
                {incorrectlyTypedName ? (
                  <div>
                    {" "}
                    <h3 className="error-message">
                      writing the name is requird
                    </h3>
                  </div>
                ) : (
                  <div></div>
                )}
                {rName ? (
                  <div>
                    {" "}
                    <h3 className="error-message">
                      there is a person with this name ,choose your unique name
                    </h3>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            ) : (
              <div className="usre-names">
                <h1 className="home-input">{localStorage.getItem("user")}</h1>
                <button className="button-exit" onClick={exit}>
                  Exit
                </button>
              </div>
            )}
          </div>
          {}
        </div>

        <div className="rooms">
          {roomList.map((el, index) => (
            <div key={index}>
              <button
                className="button-rooms"
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
