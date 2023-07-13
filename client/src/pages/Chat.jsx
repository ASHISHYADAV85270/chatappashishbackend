import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

const Chat = () => {
  const navigate = useNavigate();
  const [buttonDisabled, setButtonDisable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState(undefined);
  const [currentUser, setCurruser] = useState(undefined);
  const authurl = "http://localhost:5000/api/auth/checkauth";

  /* for checking user is there or not*/
  useEffect(() => {
    const checkauth = async () => {
      const data = await axios.post(authurl, {}, { withCredentials: true });
      if (data.data.success) {
        setCurruser(data.data.user);
        const username = data.data.user.username;
        toast.success(`welcome back ${username}`);
      } else {
        navigate("/login");
      }
    };
    checkauth();
  }, []);

  useEffect(() => {
    const settingusers = async () => {
      if (currentUser) {
        console.log(currentUser);
        if (currentUser.isAvataImageSet) {
          const url = "http://localhost:5000/api/auth/allusers";
          console.log(`${url}/${currentUser._id}`);
          const data = await axios.get(`${url}/${currentUser._id}`, {
            withCredentials: true,
          });
          console.log(`${url}/${currentUser._id}`);
          // setContacts(data.data);
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
