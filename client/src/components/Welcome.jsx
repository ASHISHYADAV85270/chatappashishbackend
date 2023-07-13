import React from "react";
import Robot from "../assets/robot.gif";
const Welcome = ({ currentUser }) => {
  return (
    <div className="flex items-center justify-center flex-col h-full  ">
      <img src={Robot} alt="robot" className="h-[20rem]" />
      <h1>
        Welcome ,
        <span className="text-blue-800 uppercase">
          {currentUser?.username}!
        </span>
      </h1>
      <h3>Please select a chat to Start Messaging.</h3>
    </div>
  );
};

export default Welcome;
