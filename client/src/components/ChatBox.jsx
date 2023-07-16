import React, { useEffect, useState, useRef } from "react";
import ChatBoxheader from "./ChatBoxheader";
import ChatBoxInput from "./ChatBoxInput";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  getallmessagesurl,
  handleSendMsgurl,
  sendMessageRouteurl,
} from "../utils/routes";

const ChatBox = ({ currentChat, currentUser, socket }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /**get all the messages of that particular person to person */
  useEffect(() => {
    getallmessages();
    async function getallmessages() {
      try {
        setLoading(true);
        const from = currentUser._id;
        const to = currentChat._id;
        const resp = await axios.post(
          getallmessagesurl,
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

    const data = await axios.post(
      handleSendMsgurl,
      { from: currentUser._id, to: currentChat._id, message: msg },
      { withCredentials: true }
    );
    if (data.data.success) {
      toast.success(data.data.message);
      socket.current.emit("send-msg", {
        to: currentChat._id,
        from: data._id,
        msg,
      });
      await axios.post(sendMessageRouteurl, {
        from: data._id,
        to: currentChat._id,
        message: msg,
      });
      const msgs = [...messages];
      msgs.push({ fromSelf: true, message: msg });
      setMessages(msgs);
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
      <div className="chat-messages  p-7 flex flex-col overflow-auto gap-[1rem] h-[77%] bg-c1  border-r-[0.2rem] border-c3">
        {!loading &&
          messages.map((message, index) => {
            return (
              <div key={index}>
                <div
                  className={`message   flex  items-center  ${
                    message.fromSelf
                      ? "sended justify-end "
                      : "recieved  justify-start"
                  }`}
                >
                  <div
                    className={`content   text-[1.4rem]  border-[0.1rem]   max-w-[40%]  ${
                      message.fromSelf
                        ? " bg-c3 border-c5 "
                        : " bg-c5 border-c3"
                    } `}
                  >
                    <p
                      className={` break-words  ${
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
      <Toaster />
    </div>
  );
};

export default ChatBox;
