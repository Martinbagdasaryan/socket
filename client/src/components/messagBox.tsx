import axios from "axios";
import React, { FC, useEffect, useState } from "react";

import "./messagBox.css";
import { IMessage, IBackground, IArrMessages } from "../types/interfaces";

const MessagBox: FC<IMessage> = ({ message }) => {
  
  const [background, setBackground] = useState<IBackground>();
  const [userMessages, setUserMessages] = useState<IArrMessages[]>([]);

  useEffect((): void => {
    getRooms();
    getMessage();
  }, []);

  const getRooms: Function = async (): Promise<void> => {
    const getRooms = await axios.get("http://localhost:4000/api/room");
    const roomData:IBackground[] = getRooms.data;
    setBackground(getRooms.data[roomData.length - 1]);
  };

  const getMessage: Function = async (): Promise<void> => {
    const getMessage = await axios.get("http://localhost:4000/api");
    setUserMessages(getMessage.data);
  };

  return (
    <div>
      <div
        className="messageBox"
        style={{ background: background?.background }}
      >
        {message.length === 0 ? (
          <div>
            {userMessages.map((element: IArrMessages, index) => {
              return (
                <div key={index}>
                  <div>
                    {element.roomI?.roomId === localStorage.getItem("room") ? (
                      <div>
                        {element.name === localStorage.getItem("user") ? (
                          <div>
                            <div className="messageRigth" key={element.id}>
                              <p className="messageText">{element.text}</p>

                              <p className="messageRigth">{element.name}</p>
                            </div>

                            <div className="messageRigth">
                              <p>{element.data}</p>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="messageLeft" key={element.id}>
                              <p>{element.name}</p>
                              <p className="messageTextLeft">{element.text}</p>
                            </div>
                            <p>{element.data}</p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            {message?.map((element: IArrMessages, index) => {
              return (
                <div key={index}>
                  <div>
                    {element.roomI?.roomId === localStorage.getItem("room") ? (
                      <div>
                        {element.name === localStorage.getItem("user") ? (
                          <div>
                            <div className="messageRigth" key={element.id}>
                              <p className="messageText">{element.text}</p>
                              <p>{element.name}</p>
                            </div>

                            <div className="messageRigth">
                              <p>{element.data}</p>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="messageLeft" key={element.id}>
                              <p>{element.name}</p>
                              <p className="messageTextLeft">{element.text}</p>
                            </div>
                            <p className="messageLeft">{element.data}</p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagBox;
