import { userModel } from '../model/userModel.js';
import jwt from 'jsonwebtoken';

export const isAuthenticated = async (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) {
        console.log("login first")
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
            console.log(req.user);
            next();
        }
    } catch (error) {
        console.log("Hi i am authenticted error", error);
    }
}