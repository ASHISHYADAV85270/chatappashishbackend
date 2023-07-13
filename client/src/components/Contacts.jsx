import React, { useEffect, useState } from "react";
import logo from "../assets/logo.svg";
const Contacts = ({ currcontacts, currentUser, changeChat }) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [loading, setLoading] = useState(false);

  /********to fetch data of the chats of the user */

  useEffect(() => {
    setCurrentUserName(currentUser?.username);
    setCurrentUserImage(currentUser?.avataImage);
  }, [currentUser]);

  const changecurrChatandIndex = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <>
      {currentUserName && currentUserImage && (
        <div className="grid grid-flow-row  grid-rows-[10%,77%,15%]  gap-[0.4rem] h-full  w-full">
          <div className="brand flex flex-row items-center justify-center gap-[0.5rem] ">
            <img src={logo} alt="logo" className="h-[2rem]" />
            <h3 className="uppercase text-c3">snappy</h3>
          </div>
          <div className="contacts flex flex-col items-center overflow-auto py-5 gap-[0.4rem] bg-[#ffffff34]  justify-start  ">
            {currcontacts?.map((contact, index) => {
              return (
                <div
                  className={`flex flex-row items-center gap-[1rem]  min-h-[5rem] cursor-pointer w-[95%]  p-[0.4rem]  transition duration-500 ease-in-out bg-gray-700 border-[0.02rem] rounded-md ${
                    index === currentSelected ? "bg-[#638b95] " : ""
                  }  `}
                  key={contact._id}
                  onClick={() => {
                    changecurrChatandIndex(index, contact);
                  }}
                >
                  <img
                    src={`data:image/svg+xml;base64,${contact?.avataImage}`}
                    alt="avatar"
                    className="h-[3rem]"
                  />
                  <h3 className="uppercase">{contact?.username}</h3>
                </div>
              );
            })}
            {currcontacts?.map((contact, index) => {
              return (
                <div
                  className={`flex flex-row items-center gap-[1rem]  min-h-[5rem] cursor-pointer w-[95%]  p-[0.4rem]  transition duration-500 ease-in-out bg-gray-700 border-[0.02rem] ${
                    index === currentSelected ? "bg-[#638b95]" : ""
                  }  `}
                  key={contact._id}
                  onClick={() => {
                    setCurrentSelected(index);
                  }}
                >
                  <img
                    src={`data:image/svg+xml;base64,${contact?.avataImage}`}
                    alt="avatar"
                    className="h-[3rem]"
                  />
                  <h3 className="uppercase">{contact?.username}</h3>
                </div>
              );
            })}
          </div>
          <div>
            <div className="flex  gap-3 justify-center items-center p-3">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt=""
                className="h-[3rem]"
              />
              <h2 className=" uppercase">{currentUserName}</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Contacts;
