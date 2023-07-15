import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import axios from "axios";

export default function ChatBoxInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <Container className="flex  w-full bg-[#ffffff34]   h-[10.2vh] overflow-hidden p-2">
      <div className="button-container  flex  items-center text-white gap-[1rem]   w-[5%] h-full">
        <div className="emoji relative flex items-center justify-center">
          <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
      <div className=" w-[95%] h-full">
        <form
          className="  border-solid rounder-[2rem] flex items-center justify-center   h-full  "
          onSubmit={(event) => sendChat(event)}
        >
          <div className="h-full w-[95%]">
            <input
              type="text"
              placeholder="type your message here"
              onChange={(e) => setMsg(e.target.value)}
              value={msg}
              className="w-[90%] h-[80%] rounded-[0.5rem] bg-transparent text-white border   selection:bg-[#9a86f3] focus:outline-none"
            />
          </div>
          <div className=" w-[10%]">
            <button
              type="submit"
              className="p-[0.3rem 2rem] border-[2rem]   border-none"
            >
              <span>
                <IoMdSend
                  size={"40px"}
                  className="  text-black hover:text-c3"
                />
              </span>
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .emoji {
    position: relative;
    svg {
      font-size: 1.5rem;
      color: #ffff00c8;
      cursor: pointer;
    }
    .emoji-picker-react {
      position: absolute;
      top: -350px;
      background-color: #080420;
      box-shadow: 0 5px 10px #9a86f3;
      border-color: #9a86f3;
      .emoji-scroll-wrapper::-webkit-scrollbar {
        background-color: #080420;
        width: 5px;
        &-thumb {
          background-color: #9a86f3;
        }
      }
      .emoji-categories {
        button {
          filter: contrast(0);
        }
      }
      .emoji-search {
        background-color: transparent;
        border-color: #9a86f3;
      }
      .emoji-group:before {
        background-color: #080420;
      }
    }
  }
`;
