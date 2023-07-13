import bcrypt from 'bcrypt';
import { userModel } from '../model/userModel.js';
import { sendCookie } from '../utils/features.js';
import jwt from 'jsonwebtoken';

export async function RegisterUser(req, res, next) {
    try {
        const { username, useremail, userpassword } = req.body;
        let user = await userModel.findOne({ useremail });
        if (user) {
            return res.status(201).json({ success: false, message: "User Alreadt Exist" })
        }
        const hashedpassword = await bcrypt.hash(userpassword, 10);
        user = await userModel.create({ username, useremail, userpassword: hashedpassword });
        return res.status(201).json({ success: true, message: "User created" });
    } catch (error) {
        console.log(error);
    }
}

export async function LoginUser(req, res, next) {
    try {
        const { useremail, userpassword } = req.body;
        let user = await userModel.findOne({ useremail }).select("+userpassword");
        if (!user) {
            return res.status(201).json({ success: false, message: "User does not exist" });
        }
        const hashedpassword = userpassword;
        const isMatch = await bcrypt.compare(hashedpassword, user.userpassword);
        if (isMatch) {
            return sendCookie(user, res, "Login Successfully", 200);
        }
        else {
            return res.status(201).json({ success: false, message: "Password Or Email Doesnot match" });
        }
    } catch (error) {
        console.log(error);
        return res.status(201).json({ success: false, message: "Some Error" });
    }
}


export async function setavatar(req, res, next) {
    const token = req.cookies?.token;
    const avataImage = req.body?.image;
    const isAvataImageSet = true;
    if (!token) {
        return res.json({ success: false });
    }
    try {
        const decodedId = jwt.verify(token, process.env.JWT_SECRET);
        let user = await userModel.findByIdAndUpdate(decodedId, { isAvataImageSet, avataImage });
        if (!user) {
            return res.status(404).json({ success: false, message: "Some Error Avatar Not  Updated" });
        }
        return res.status(201).json({ success: true, message: "User Avatar Updated" });
    } catch (error) {
        return res.status(201).json({ success: false, message: "Some Error" });
    }
}


export async function getAllUsers(req, res, next) {
    try {
        const users = await userModel.find({ _id: { $ne: req.params.id } });
        console.log(req.params.id);
        // console.log(users)
        return res.json({ success: true });
    } catch (ex) {
        next(ex);
    }
}