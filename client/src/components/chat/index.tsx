import Body from "./compnents/body";
import Sidebar from "./compnents/sidebar";
import MesssagBlock from "./compnents/messag-block";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import React from "react";

const ChatPage = ({ socket }) => {
  const [message, setMessage] = useState<object[]>([]);

  useEffect(() => {
    socket.on("response", (data: object) => {
      setMessage([...message,data]);
    });
  }, [socket,message]);
  
  return (
    <div>
      <div >
        <main style={{  border: "1px solid black",}} >
          <Body  message={message} />
        </main>
          <MesssagBlock socket={socket} />
      </div>
    </div>
  );
};

export default ChatPage;

ChatPage.propTypes = {
  socket: PropTypes.object,
};
