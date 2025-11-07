
import express from "express";
import AuthRoutes from "./routes/auth.routes.js";
const app = express();
app.use(express.json);
app.use('/')

export default app;
