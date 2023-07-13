import { useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import loader from "../assets/loader.gif";
import { Buffer } from "buffer";
function SetAvatar() {
  const api_route_for_images = "https://api.multiavatar.com/54433"; //for getting random images
  const AVATARKEY = `?apikey=J5WSeU29gVFq16`;
  const navigate = useNavigate();

  // for setting avatar
  const [avatars, setAvatars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const setProfilePicture = async () => {
    try {
      if (selectedAvatar === undefined) {
        toast.error("Please Select a Avatar");
        return;
      }
      const url = "http://localhost:5000/api/auth/setavatar";
      const data = await axios.post(
        url,
        { image: avatars[selectedAvatar] },
        { withCredentials: true } //to excess token and send token data to backend
      );
      console.log("helllo bhaitw");
      console.log(data.data);
      if (data.data.success) {
        toast.success(data.data.message);
        navigate("/");
      } else {
        toast.error(data.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error("error in the setavatar calling");
      navigate("/login");
    }
  };

  /* for checking user is there or not*/
  const authurl = "http://localhost:5000/api/auth/checkauth";
  const [currentUser, setCurruser] = useState(undefined);
  useEffect(() => {
    const checkauth = async () => {
      const data = await axios.post(authurl, {}, { withCredentials: true });
      if (data.data.success) {
        setCurruser(data.data.user);
      } else {
        toast.error("Login First");
        navigate("/login");
      }
    };
    checkauth();
  }, []);
  /**** */

  useEffect(() => {
    const getimagesdata = async () => {
      try {
        const data = [];
        setLoading(true);
        for (let i = 0; i < 5; i++) {
          const x = Math.round(Math.random() * 1000);
          const avatarImage = await axios.get(
            `${api_route_for_images}${x}${AVATARKEY}`
          );
          const buffer = new Buffer(avatarImage.data);
          const stringimagedata = buffer.toString("base64");
          data.push(stringimagedata);
        }
        setAvatars(data);
      } catch (error) {
        toast.error("Some error please try again");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    getimagesdata();
  }, [currentUser]);

  return (
    <div className=" h-[100vh] bg-c1 flex flex-col items-center justify-center gap-9 w-[100vw]">
      {loading ? (
        <img src={loader} alt="loader" className="loader" />
      ) : (
        <>
          <h1 className="text-4xl font-bold  text-c3">
            Pick an avatar as your profile picture
          </h1>
          <div className="flex justify-center items-center gap-20 h-[120px] font-bold text-c3">
            {loading ? "Please Refersh Avatar not Fetched" : ""}
            {avatars.map((avatar, index) => {
              return (
                <div
                  className={`  ${
                    selectedAvatar === index
                      ? " border-[#4e0eff] border-[0.4rem] rounded-full"
                      : ""
                  }`}
                  id={index}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                    className="h-[6rem] ease-in-out  cursor-pointer"
                  />
                </div>
              );
            })}
          </div>
          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-1/4 h-14 rounded-md cursor-pointer p-[1px]">
            <div className="flex  items-center  text-2xl  justify-center font-semibold bg-c1 h-full rounded-md gap-3">
              <button onClick={setProfilePicture}>Set Avatar</button>
            </div>
          </div>
        </>
      )}

      <Toaster />
    </div>
  );
}

export default SetAvatar;
