import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Chat from './pages/Chat';
import Login from './pages/Login';
import Register from './pages/Register';
import { Toaster } from "react-hot-toast";
import SetAvatar from './pages/SetAvatar';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/login" element={<Login />} />
        <Route path="/setavatar" element={<SetAvatar />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Toaster />
    </Router>
  )
}

export default App