import React from "react";
import ChatBoxheader from "./ChatBoxheader";
import ChatBoxMessage from "./ChatBoxMessage";
import ChatBoxInput from "./ChatBoxInput";

const ChatBox = () => {
  return (
    <div className="grid grid-flow-row gap-1 overflow-hidden">
      <div className="h-[8.5vh]">
        <ChatBoxheader />
      </div>
      <div className="h-[68vh]">
        <ChatBoxMessage />
      </div>
      <div className="h-[8.5vh]">
        <ChatBoxInput />
      </div>
    </div>
  );
};

export default ChatBox;

