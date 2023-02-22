import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js";
dotenv.config();
const app = express();

//app.use(cors({ credentials:true, origin:true}));
app.use(cors({
    origin: 'https://fe-htlaw.vercel.app/'
}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://fe-htlaw.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });
  
app.use(cookieParser());
app.use(express.json());
app.use(UserRoute);

app.listen(5000, ()=> console.log('Server up and running..on 5000.'));