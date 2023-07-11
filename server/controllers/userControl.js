import bcrypt from 'bcrypt';
import { userModel } from '../model/userModel.js';
import { sendCookie } from '../utils/features.js';

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
            return sendCookie(user, res, "Login Successfully", 201);
        }
        else {
            return res.status(201).json({ success: false, message: "Password Or Email Doesnot match" });
        }
    } catch (error) {
        console.log(error);
        return res.status(201).json({ success: false, message: "Some Error" });
    }
}

export async function getprofile(req, res) {
    res.send("hi");
}

export async function setavatar(req, res, next) {
    console.log(req);
    return res.status(201).json({ success: true, message: "User created" });

}
