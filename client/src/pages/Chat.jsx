import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

const Chat = () => {
  const navigate = useNavigate();
  const [buttonDisabled, setButtonDisable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState(undefined);

  /* for checking user is there or not*/
  const authurl = "http://localhost:5000/api/auth/checkauth";
  const [currentUser, setCurruser] = useState(undefined);
  useEffect(() => {
    const checkauth = async () => {
      const data = await axios.post(authurl, {}, { withCredentials: true });
      if (data.data.success) {
        const username = data?.data?.user?.username;
        setCurruser(data.data.user);
        toast.success(`welcom back ${username}`);
      } else {
        toast.error("Login First");
        navigate("/login");
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
          console.log(otherusers);
        } else {
          navigate("/setAvatar");
        }
      }
    };
    settingusers();
  }, [currentUser]);

  return (
    <div className="text-red-400">
      Chat
      <Toaster />
    </div>
  );
};

export default Chat;
