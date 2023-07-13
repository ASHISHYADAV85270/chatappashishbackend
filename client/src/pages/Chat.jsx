import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import Contacts from "../components/Contacts";

const Chat = () => {
  const navigate = useNavigate();
  // const [buttonDisabled, setButtonDisable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currcontacts, setcurrContacts] = useState(undefined);
  // const [currentChat, setCurrentChat] = useState(undefined);

  /* for checking user is there or not*/
  const authurl = "http://localhost:5000/api/auth/checkauth";
  const [currentUser, setCurruser] = useState(undefined);
  useEffect(() => {
    const checkauth = async () => {
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
    };
    checkauth();
  }, []);
  /**** */

  useEffect(() => {
    const settingusers = async () => {
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
    };
    settingusers();
  }, [currentUser]);

  return (
    <>
      <div className="h-[100vh] bg-c1 w-[100vw] flex flex-col justify-center gap-3 items-center">
        <div className="container h-[85vh] w-[85vw] bg-blue-600 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 ">
          <div className="w-1/4 bg-c5  overflow-hidden">
            <Contacts currcontacts={currcontacts} currentUser={currentUser} />
          </div>
          <div className="w-3/4">hi</div>
        </div>
        <Toaster />
      </div>
    </>
  );
};

export default Chat;
