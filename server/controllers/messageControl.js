import bcrypt from 'bcrypt';
import { messageModel } from '../model/messageModel.js';
import { sendCookie } from '../utils/features.js';
import jwt from 'jsonwebtoken';

export async function addMessage(req, res, next) {

    try {
        const { from, to, message } = req.body;
        const data = await messageModel.create({
            message: { text: message },
            users: [from, to],
            sender: from,
        });
        if (data) {
            return res.json({ success: true, message: "Sended" });
        }
    } catch (error) {
        return res.json({ success: false, message: "Some Error In Db" });
    }


}

export async function getAllMessages(req, res, next) {
    try {
        const { from, to } = req.body;
        // console.log({ from }, { to });
        const messages = await messageModel.find({
            users: {
                $all: [from, to]
            },
        }).sort({ updatedAt: 1 });

        // console.log({ messages });
        if (messages) {
            const projectMessages = messages.map((msg) => {
                //from self hoga to true hojaiga brma false save hojaiga fromSelf kai andar
                return { fromSelf: msg.sender.toString() === from, message: msg.message.text }
            });
            // console.log({ projectMessages });
            return res.json({ success: true, projectMessages });
        }
        return res.json({ success: true, message: "NO data found" });

    } catch (error) {
        return res.json({ success: false, message: "Some error in getting all the messages or there is no message" })
    }
}