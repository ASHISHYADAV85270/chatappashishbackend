import { app } from './app.js';
import { connectDB } from './data/database.js';
import { Server } from "socket.io";
import cors from 'cors';
connectDB();

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: "this is a backend server"
    })
})
const server = app.listen(process.env.PORT, () => {
    console.log(`server is working on port ${process.env.PORT} at ${process.env.NODE_ENV} mode`);
});

const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        credentials: true,
    },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", data.msg);
        }
    });
});