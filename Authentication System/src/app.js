
import express from "express";
import AuthRoutes from "./routes/auth.routes.js";
const app = express();
app.use(express.json());
app.get('/',(req , res)=>{
    res.send({message:"hello world"});
});
app.use('/auth',AuthRoutes);

export default app;
