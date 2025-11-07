
import mongoose  from "mongoose";

const ConnectDb = async()=>{
try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("database connected sucessfully");
} catch (err) {
    console.log(err.message)
    process.exit(1)
}

};

export default ConnectDb ;