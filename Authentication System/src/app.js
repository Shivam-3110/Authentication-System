
import express from "express";
import AuthRoutes from "./routes/auth.routes.js";
import cookieparser from "cookie-parser";
const app = express();
app.use(express.json());
app.use(cookieparser());
app.get('/',(req , res)=>{
    res.send({message:"hello world"});
});
app.use('/auth',AuthRoutes);

export default app;
