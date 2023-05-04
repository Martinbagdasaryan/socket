import axios from "axios";
import React, { FC, useEffect, useState } from "react";

import "./messagBox.css";
import { IMessage, IArrMessages } from "../types/interfaces";

const MessagBox: FC<IMessage> = ({ message ,roomID}) => {
  
  const [userMessages, setUserMessages] = useState<IArrMessages[]>([]);

  useEffect((): void => {
    getMessage();
  }, []);


  const getMessage: Function = async (): Promise<void> => {
    const responsMessage = await axios.get("http://localhost:4000/api");
    setUserMessages(responsMessage.data);
  };
  
  return (
    <div>
      <div
        className="message-box"
        style={{ background: roomID?.background }}
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
                            <div className="message-rigth" key={element.id}>
                              <p className="message-text">{element.text}</p>

                              <p className="message-rigth">{element.name}</p>
                            </div>

                            <div className="message-rigth">
                              <p>{element.data}</p>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="message-left" key={element.id}>
                              <p>{element.name}</p>
                              <p className="message-text-left">{element.text}</p>
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
                            <div className="message-rigth" key={element.id}>
                              <p className="message-text">{element.text}</p>
                              <p>{element.name}</p>
                            </div>

                            <div className="message-rigth">
                              <p>{element.data}</p>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="message-left" key={element.id}>
                              <p>{element.name}</p>
                              <p className="message-text-left">{element.text}</p>
                            </div>
                            <p className="message-left">{element.data}</p>
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
