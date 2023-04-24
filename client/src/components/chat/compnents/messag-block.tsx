import { useState } from "react";
import PropTypes from "prop-types";
import React from "react";



function MesssagBlock({ socket }) {
  const [message, setMessage] = useState("");

  const handleSend = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem("user")) {
      socket.emit("message", {
        id: `${socket.id}`,
        socketID: socket.id,
        text: message,
        name: localStorage.getItem("user"),
      });
    }

    setMessage("");
  };

  return (
    <div>
      <form
        style={{
          padding: 100,
          color: "#060000 ",
          textAlign: "center",
        }}
      >
        <input
          type="text"
          style={{
            width: "500px",
            height: "37px",
          }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button style={{ height: "40px" }} onClick={handleSend}>
          uxarkel
        </button>
      </form>
    </div>
  );
}

export default MesssagBlock;

MesssagBlock.propTypes = {
  socket: PropTypes.object,
};
