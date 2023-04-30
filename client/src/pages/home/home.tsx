import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IProps } from "../../types/interfaces";
import axios from "axios";

import "./home.css";

const Home: FC<IProps> = ({ setRoom, socket }) => {
  const navigate: ReturnType<typeof useNavigate> = useNavigate();
  const [user, setUser] = useState<string>("");
  const [flag, setFlag] = useState<number>(0);
  const [users, setUsers] = useState<any>([]);
  const [redFlag, setRedFlag] = useState<any>(0);

  const room_namber: { id: string; background: string }[] = [
    {
      id: "1",
      background: "rgb(174 255 225)",
    },
    {
      id: "2",
      background: "rgb(255 146 232)",
    },
    {
      id: "3",
      background: "rgb(254 255 174)",
    },
    {
      id: "4",
      background: "rgb(174 229 255)",
    },
  ];

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async (): Promise<void> => {
    const res = await axios.get("http://localhost:4000/api/user");
    setUsers(res.data.users);
  };


  const room = async (el: { id: string; background: string }): Promise<void> => {
    let userNumber=0
    if (localStorage.getItem("user") === null && user !== "") {

      users?.map((elm: any) => {
        if (elm.user === user) {
           setRedFlag(1);
           userNumber+=1
        }
      });
      const GItme = ()=>{
        if(userNumber===0){
     
          localStorage.setItem("user", user);
          setFlag(0);
          setRedFlag(0);
          console.log(1);
        }  
      }
    
    await GItme();
} else {
           
      setFlag(1);
    }

    localStorage.setItem("room", el.id);
    let roomNumber=0
    if (localStorage.getItem("user")) {
      setRoom(el);
      socket.emit("room", el);
      const user = localStorage.getItem("user");
      const room = localStorage.getItem("room");
      users?.map((elm: any) => {
        if (elm.user === user && elm.room===room) {
           roomNumber+=1
        }
      });
      if(roomNumber===0){
        
        socket.emit("newUser", { id:Math.random(), user: user, socketId: socket.id, room: room });
      }

      navigate("/chat");
    }
  };

  const Exit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div>
      <div className="home">
        <div className="homess">
          <div>
            {localStorage.getItem("user") === null ? (
              <div>
                {" "}
                <h3 className="inputTopName">Name</h3>
                <input
                  type="text"
                  className="inputName"
                  placeholder="   writing the name is requird"
                  onChange={(e) => setUser(e.target.value)}
                />
                {flag === 1 ? (
                  <div>
                    {" "}
                    <h3 className="errorMessage">
                      writing the name is requird
                    </h3>
                  </div>
                ) : (
                  <div></div>
                )}
                {redFlag === 1 ? (
                  <div>
                    {" "}
                    <h3 className="errorMessage">there is a person with this name ,choose your unique name</h3>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            ) : (
              <div className="usreName">
                <h1 className="homeInput">{localStorage.getItem("user")}</h1>
                <button className="buttonExit" onClick={Exit}>
                  Exit
                </button>
              </div>
            )}
          </div>
          {}
        </div>

        <div className="roomsel">
          {room_namber.map((el) => (
            <div>
              <button
                className="buttonRooms"
                style={{
                  background: el.background,
                }}
                onClick={() => room(el)}
              >
                room{el.id}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
