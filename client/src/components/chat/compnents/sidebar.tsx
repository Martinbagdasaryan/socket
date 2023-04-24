import React, { useEffect, useState } from "react";

const Sidebar = ({socket}) => {
  const [id,setid]= useState([])

  useEffect(()=>{
    socket.on("connection",(data:any)=>{
      setid(data)
    })
    console.log(id);
    
  },[])

  return (
    <div
      style={{
        borderRight: "1px solid ",
        width: "100px",
        height: "61vh",
        position: "absolute",
        top: 0,
        paddingTop: "20%",
      }}
    >
      
      <h4 className="header">User</h4>
      <ul className="users">
        <li>user1</li>
        <li>user2</li>
        <li>user3</li>
      </ul>
    </div>
  );
};
export default Sidebar;
