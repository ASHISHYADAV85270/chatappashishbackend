import React, { useEffect, useState } from "react";
import ChatBoxheader from "./ChatBoxheader";
import ChatBoxInput from "./ChatBoxInput";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ChatBox = ({ currentChat, currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /**get all the messages of that particular person to person */
  useEffect(() => {
    const url = "http://localhost:5000/api/messages/getallmessages";
    getallmessages();
    async function getallmessages() {
      try {
        setLoading(true);
        const from = currentUser._id;
        const to = currentChat._id;
        const resp = await axios.post(
          url,
          {
            from,
            to,
          },
          { withCredentials: true }
        );
        const { projectMessages } = resp.data;
        setMessages(projectMessages);
        console.log({ messages });
      } catch (error) {
        console.log("Error");
        navigate("/");
      } finally {
        setLoading(false);
      }
    }
  }, [currentChat]);

  /*** sending messages */
  const handleSendMsg = async (msg) => {
    // console.log(msg);
    const url = "http://localhost:5000/api/messages/addMessage";

    const data = await axios.post(
      url,
      { from: currentUser._id, to: currentChat._id, message: msg },
      { withCredentials: true }
    );
    if (data.data.success) {
      toast.success(data.data.message);
    } else {
      toast.error(data.data.message);
    }
  };

  return (
    <div className="flex flex-col  h-full  w-full ">
      <div className="h-[11%] ">
        <ChatBoxheader
          username={currentChat.username}
          avataImage={currentChat.avataImage}
        />
      </div>
      <div className="chat-messages  p-7 flex flex-col overflow-auto gap-[1rem] h-[77%] bg-c1 ">
        {!loading &&
          messages.map((message, index) => {
            return (
              <div key={index}>
                <div
                  className={`message   flex items-center  ${
                    message.fromSelf
                      ? "sended justify-end "
                      : "recieved  justify-start"
                  }`}
                >
                  <div
                    className={`content  flex-wrap text-[1.4rem]  border-[0.1rem]   max-w-[40%]  ${
                      message.fromSelf
                        ? " bg-c3 border-c5 "
                        : " bg-c5 border-c3"
                    } `}
                  >
                    <p
                      className={`${
                        message.fromSelf ? " text-c5 " : " text-c3"
                      }`}
                    >
                      {message.message}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div className="h-[12%] border-t-[0.2rem] border-c3 ">
        <ChatBoxInput handleSendMsg={handleSendMsg} />
      </div>
      {/* <Toaster /> */}
    </div>
  );
};

export default ChatBox;
