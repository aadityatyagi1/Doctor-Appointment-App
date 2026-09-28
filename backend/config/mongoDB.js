import mongoose from "mongoose";

const connectDB=async()=>{
    try{
        
       await mongoose.connect(`${process.env.MONGODB_URI}/medicall`);
       console.log("connected");

    }catch(err){
        console.log("Mongo DB error",err.megssage);
    }
   
}

export default connectDB;