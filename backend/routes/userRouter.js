import express from "express";
const userRouter=express.Router();
import {userRegistration,userLogin,getProfile,editProfile,appointmentBookin,listAppointment,cancelAppointment,payment,varifyRazorpay} from "../controller/userController.js";
import {authUser} from "../middlewares/authUser.js";
import upload from "../middlewares/multer.js";

userRouter.post("/register",userRegistration);

userRouter.post("/login",userLogin);

userRouter.post("/getProfile",authUser,getProfile);
userRouter.post("/editProfile",upload.single('image'),authUser,editProfile);

userRouter.post("/bookAppointment",authUser,appointmentBookin);

userRouter.get("/appointment",authUser,listAppointment);

userRouter.post("/cancelAppointment",authUser,cancelAppointment);

userRouter.post("/payment",authUser,payment);

userRouter.post("/verifyPayment",authUser,varifyRazorpay);

export default userRouter;