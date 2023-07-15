import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatBox from "../components/ChatBox";

const Chat = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currcontacts, setcurrContacts] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);

  /* for checking user is there or not*/
  const authurl = "http://localhost:5000/api/auth/checkauth";
  const [currentUser, setCurruser] = useState(undefined);
  useEffect(() => {
    checkauth();
    async function checkauth() {
      try {
        setLoading(true);
        const data = await axios.post(authurl, {}, { withCredentials: true });
        if (data.data.success) {
          const username = data?.data?.user?.username;
          setCurruser(data.data.user);
          toast.success(`welcom back ${username}`);
        } else {
          toast.error("Login First");
          navigate("/login");
        }
      } catch (error) {
        console.log("error from chat.jsx");
      } finally {
        setLoading(false);
      }
    }
  }, []);
  /**** */

  /***Gettin all contacts other then user */
  useEffect(() => {
    settingusers();
    async function settingusers() {
      if (currentUser) {
        if (currentUser.isAvataImageSet) {
          const url = "http://localhost:5000/api/auth/allusers";
          const data = await axios.get(`${url}/${currentUser._id}`, {
            withCredentials: true,
          });
          const otherusers = data.data.otherusers;
          setcurrContacts(otherusers);
        } else {
          navigate("/setAvatar");
        }
      }
    }
  }, [currentUser]);

  return (
    <>
      {loading ? (
        <div className="text-black">Loading</div>
      ) : (
        <div className="h-[100vh] bg-c1 w-[100vw] flex flex-col justify-center  items-center toooop">
          <div className=" h-[85vh] w-[85vw]  grid  grid-flow-col bg-c5 overflow-hidden">
            <div className="w-[18.5vw] overflow-hidden">
              <Contacts
                currcontacts={currcontacts}
                currentUser={currentUser}
                setCurrentChat={setCurrentChat}
              />
            </div>
            <div className="w-[66.5vw] overflow-hidden">
              {currentChat === undefined ? (
                <Welcome currentUser={currentUser} />
              ) : (
                <ChatBox currentChat={currentChat} currentUser={currentUser} />
              )}
            </div>
          </div>
        </div>
      )}

      <Toaster />
    </>
  );
};

export default Chat;
