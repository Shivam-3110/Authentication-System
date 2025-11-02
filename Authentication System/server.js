 import app  from "./src/app.js";
 import env from"dotenv";
 env.config();
  const PORT = process.env.PORT





 app.listen(PORT ,()=>{
    console.log(`the server is running on ${PORT}`);
 })
