import express from "express";
import cors from 'cors';
import { config } from 'dotenv';
import userRouter from './routes/userRouter.js';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

export const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
config({
    path: "./data/config.env"
});

// app.use(cors()); //jis sai dusrai server sai excess kr skai 
app.use(
    cors({
        origin: [process.env.FRONTEND_URL], //jooo url iffsai excess krskta hai
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,  //iskoo true krna hota jis sai cookies dusrai url sai share kr skai
    })
);
app.use('/api/auth', userRouter);
