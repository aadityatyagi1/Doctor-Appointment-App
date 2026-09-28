import express from "express";
import cors from "cors";
import 'dotenv/config';

import connectDB from "./config/mongoDB.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRouter.js";
import doctorRouter from "./routes/doctorRouter.js";
import userRouter from "./routes/userRouter.js";

// app config
const app=express();
const port=process.env.PORT || 4000
// connecting connection with database
connectDB();
connectCloudinary();

// middleware
app.use(express.json());
app.use(cors());


// api endpoint
app.use("/api/admin",adminRouter);
app.use("/api/doctor",doctorRouter);
app.use("/api/user",userRouter);


app.get("/",(req,res)=>{
    res.send("Working api");
});

app.listen(port,()=>{
    console.log("app is listining ");
});