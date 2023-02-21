import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import UserRoute from "./view-be/routes/UserRoute.js";
dotenv.config();
const app = express();

app.use(cors({ credentials:true, origin:true}));
app.use(cookieParser());
app.use(express.json());
app.use(UserRoute);

app.listen(5000, ()=> console.log('Server up and running..on 5000.'));