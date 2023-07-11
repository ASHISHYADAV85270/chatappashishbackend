import express from 'express';
import { LoginUser, RegisterUser, setavatar } from '../controllers/userControl.js';

const router = express();
router.post('/register', RegisterUser); //api/auth/register
router.post('/login', LoginUser); //api/auth/register
router.post('/setavatar', setavatar);

export default router;