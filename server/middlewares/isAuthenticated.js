import { userModel } from '../model/userModel.js';
import jwt from 'jsonwebtoken';

export const isAuthenticated = async (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) {
        return res.status(201).json({
            success: false,
            message: "Login First",
        });
    }
    try {
        const decodedId = jwt.verify(token, process.env.JWT_SECRET);
        const userid = decodedId._id._id;
        const user = await userModel.findById(userid);
        if (user) {
            req.user = user;
            next();
        }
    } catch (error) {
        console.log("Hi i am authenticted error", error);
    }
}


//for checking  user is there or not
export const checkauth = async (req, res) => {
    const token = req.cookies?.token;
    if (!token) {
        return res.json({ success: false });
    }
    try {
        const decodedId = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decodedId);
        if (!user) {
            return res.json({ success: false });
        }
        return res.json({ success: true, user })
    } catch (error) {
        return res.json({ success: false });
    }
}