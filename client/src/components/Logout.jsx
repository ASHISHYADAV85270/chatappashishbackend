import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import styled from "styled-components";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
// import { logoutRoute } from "../utils/APIRoutes";
export default function Logout() {
  const navigate = useNavigate();
  const [buttonDisabled, setButtonDisable] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    setButtonDisable(true);
    try {
      const url = "http://localhost:5000/api/auth/logoutuser";
      let { data } = await axios.get(url, { withCredentials: true });
      toast.success(data.message);
      return navigate("/login");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setButtonDisable(false);
    }
  };

  return (
    <Button
      onClick={handleClick}
      disabled={buttonDisabled}
      className="bg-c5 hover:bg-c3"
    >
      <BiPowerOff />
    </Button>
  );
}
const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;
