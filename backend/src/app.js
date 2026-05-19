import express from "express";
import morgan from "morgan";
import router from "./routes/auth.routes.js";
import Noterouter from "./routes/note.routes.js";
import cookieParser from "cookie-parser";
import cors from 'cors';





const app = express();






///cors use kiya
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))





app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));






app.use("/api", router);

app.use('/api/auth',router);

app.use('/api/notes',Noterouter);


export default app;