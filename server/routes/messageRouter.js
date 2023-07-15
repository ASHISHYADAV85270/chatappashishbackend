import express from 'express';
import {
    getAllMessages, addMessage
} from '../controllers/messageControl.js';

const router = express();
router.post('/addmessage', addMessage); //api/auth/register
router.post("/getallmessages", getAllMessages);
export default router;  