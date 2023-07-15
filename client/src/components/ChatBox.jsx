import React from "react";
import ChatBoxheader from "./ChatBoxheader";
import ChatBoxMessage from "./ChatBoxMessage";
import ChatBoxInput from "./ChatBoxInput";

const ChatBox = ({ currentChat }) => {
  console.log(currentChat);
  return (
    <div className="grid grid-flow-row  grid-rows-[11%,77%,12%]  h-full  w-full overflow-hidden">
      <ChatBoxheader
        username={currentChat.username}
        avataImage={currentChat.avataImage}
      />
      <ChatBoxMessage />

      <ChatBoxInput />
    </div>
  );
};

export default ChatBox;
