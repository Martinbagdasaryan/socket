import axios from "axios";
import React, { FC, useEffect, useState, useRef, RefObject } from "react";

import "./messagBox.css";
import { store } from "../redux/reduxStor";
import { IMessage, IArrMessages } from "../types/interfaces";

const MessagBox: FC<IMessage> = ({ message, roomID }) => {
  const localRoom = store.getState().room.room
  const localName =store.getState().name.name
  const [userMessages, setUserMessages] = useState<IArrMessages[]>([]);
  const messageBoxRef: RefObject<HTMLDivElement> = useRef(null);

  useEffect((): void => {
    getMessage();
  }, []);

  useEffect(() => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  }, [message]);

  const getMessage: Function = async (): Promise<void> => {
    const responsMessage = await axios.get("http://localhost:4000/api");
    setUserMessages(responsMessage.data);
  };

  return (
    <div>
      <div
        className="message-box"
        style={{ background: roomID?.background }}
        ref={messageBoxRef}
      >
        {message.length === 0 ? (
          <div>
            {userMessages.map((element: IArrMessages, index) => {
              return (
                <div key={index}>
                  <div>
                    {element.roomI?.roomId === localName ? (
                      <div>
                        {element.name === localName ? (
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
                              <p className="message-text-left">
                                {element.text}
                              </p>
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
                    {element.roomI?.roomId === localRoom ? (
                      <div>
                        {element.name === localName ? (
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
                              <p className="message-text-left">
                                {element.text}
                              </p>
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
