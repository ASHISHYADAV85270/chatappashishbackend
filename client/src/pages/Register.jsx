import { NavLink, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { IoLogoGoogle, IoLogoFacebook } from "react-icons/io";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import axios from "axios";
const Register = () => {
  const navigate = useNavigate();
  const [buttonDisabled, setButtonDisable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    username: "",
    useremail: "",
    userpassword: "",
    userconfirmpass: "",
  });

  useEffect(() => {
    if (
      user.username.length > 3 &&
      user.useremail.length > 3 &&
      user.userpassword.length > 3 &&
      user.userconfirmpass.length > 3
    ) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }, [user]);

  const onRegister = async (e) => {
    e.preventDefault();
    if (user.userpassword !== user.userconfirmpass) {
      toast.error("Pass and Confirm Pass should be same", {
        position: "bottom-right",
        duration: 4000,
      });
      return;
    }
    setLoading(true);
    try {
      const url = "http://localhost:5000/api/auth/register";
      const { username, useremail, userpassword } = user;
      let { data } = await axios.post(url, {
        username,
        useremail,
        userpassword,
      });
      if (data.success) {
        toast.success(data.message);
        return navigate("/setavatar");
      } else {
        toast.error(data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="h-[100vh] flex justify-center items-center  bg-c1">
      <div className="flex items-center flex-col    ">
        <div className="text-center">
          <div className="text-4xl font-bold">Create New Account</div>
          <div className="mt-3 text-c3">
            Connect And Chat with anyone ,anywhere
          </div>
        </div>
        <div className="flex  flex-row first-line:items-center gap-2 w-full mt-10 mb-5 ">
          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-1/2 h-14 rounded-md cursor-pointer p-[1px]">
            <div className="flex flex-row items-center  justify-center font-semibold bg-c1 w-full h-full rounded-md gap-3">
              <IoLogoGoogle size={24} /> <span>Login with Google</span>
            </div>
          </div>
          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-1/2 h-14 rounded-md cursor-pointer p-[1px]">
            <div className="flex flex-row items-center  justify-center font-semibold bg-c1 w-full h-full rounded-md gap-3">
              <IoLogoFacebook size={24} /> <span>Login with Facebook</span>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center gap-1">
          <span className="w-5 h-[1px] bg-c3"></span>
          <span className="text-c3 font-semibold">OR</span>
          <span className="w-5 h-[1px] bg-c3"></span>
        </div>
        <form
          className=" flex flex-col mt-5 items-center gap-3 w-[500px]"
          onSubmit={onRegister}
        >
          <input
            type="text"
            placeholder="Display Name"
            className="w-full h-14 bg-c5 rounded-xl outline-none border-none  text-c3 px-5"
            autoComplete="off"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full h-14 bg-c5 rounded-xl outline-none border-none  text-c3 px-5"
            autoComplete="off"
            value={user.useremail}
            onChange={(e) => setUser({ ...user, useremail: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full h-14 bg-c5 rounded-xl outline-none border-none text-c3 px-5"
            autoComplete="off"
            value={user.userpassword}
            onChange={(e) => setUser({ ...user, userpassword: e.target.value })}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full h-14 bg-c5 rounded-xl outline-none border-none text-c3 px-5"
            autoComplete="off"
            value={user.userconfirmpass}
            onChange={(e) =>
              setUser({ ...user, userconfirmpass: e.target.value })
            }
          />
          <div className="w-full text-right text-c3">
            <span className="cursor-pointer">Forget Password ?</span>
          </div>
          <button
            className={`mt-4 w-full h-14 rounded-xl  text-base font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 outline-none cursor-pointer ${
              buttonDisabled ? "opacity-50" : ""
            } `}
            disabled={buttonDisabled}
            type="submit"
          >
            {loading ? "Waiting" : "Create User"}
          </button>
        </form>
        <div className="flex justify-center gap-1 text-c3 mt-5">
          <span>Already have a Account ?</span>
          <NavLink
            to={"/login"}
            className="font-semibold text-white cursor-pointer underline underline-offset-2"
          >
            Login Now
          </NavLink>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Register;
