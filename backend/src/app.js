import express from "express";
import morgan from "morgan";
import router from "./routes/auth.routes.js";
import Noterouter from "./routes/note.routes.js";
import cookieParser from "cookie-parser";
const app = express();






app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api", router);

app.use('/api/auth',router);

app.use('/api/notes',Noterouter);


export default app;