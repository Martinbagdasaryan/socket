import React from "react";
import { useNavigate } from "react-router";
import PropTypes from "prop-types";

const Body = ({ message }) => {
  const navigate = useNavigate();

  const handleleave = () => {
    localStorage.removeItem("user");
    navigate("/");
  };
  console.log(message);
  
  return (
    <>
      <header
        style={{
          display: "flex",
          justifyContent: "flex-end",
          borderBottom: "1px solid",
          background:'#000000'
        }}
      >
        <button style={{ margin: "20px" }} onClick={handleleave}>
          lqel anteranoc
        </button>
      </header>
      <div>
        {message.map((element :any) => {
          return (
            <div>
              {element.name === localStorage.getItem("user") ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    background: "#333333",
                  }}
                  key={element.id}
                >
                  <p
                    style={{
                      textAlign: "center",
                    }}
                  >
                    {element.name}
                  </p>
                    <h3 style={{ textAlign: "center" }}>{element.text}</h3>
                </div>
              ) : (
                <div
                  style={{
                    border: "1px solid black",
                    display: "flex",
                    flexDirection: "column",
                    background: "#999999",
                  }}
                  key={element.id}
                >
                  <p
                    style={{
                      textAlign: "center",  
                    }}
                  >
                    {element.name}
                  </p>
                    <h3 style={{ textAlign: "center" }}>{element.text}</h3>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Body;

Body.propTypes = {
  message: PropTypes.array,
};
