 import app  from "./src/app.js";
 import env from"dotenv";
 env.config();
  import ConnectDb from  "./src/config/db.js";

   ConnectDb();



 const PORT = process.env.PORT
 app.listen(PORT ,()=>{
    console.log(`the server is running on ${PORT}`);
 })
