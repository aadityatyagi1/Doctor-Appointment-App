import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {v2 as cloudinary} from "cloudinary";

import userModel from "../models/userModel.js";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";

import razorpay from "razorpay";


const userRegistration=async(req,res)=>{

    try{
        let {name,email,password}=req.body;

        if(!name || !email || !password){
            return res.json({success:false,message:"Data is incomplete in request"});
        }
         if(!validator.isEmail(email)){
            return res.json({success:false,message:"Email is duplicate or incorrect"});

        }
        if(password.length<8){
            return res.json({success:false,message:"Give strong password 8 digit"});
        }
        const salt=await bcrypt.genSalt(10);
        const hashPassword=await bcrypt.hash(password,salt);

        const userData={
            name,
            email,
            password:hashPassword,
        };

            const newUser=new userModel(userData);
            const user=await newUser.save();
           

        

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
         res.json({success:true,token});


        

    }catch(error){
        console.log(error);
        return res.json({success:false,message:error.message});
    }

   
   
};


// API for user login

const userLogin=async(req,res)=>{
    try{
        let {email,password}=req.body;
        const user=await userModel.findOne({email:email});
        if(!user){
            return res.json({success:false,message:"User not exit"});
        }
        const isVerify=await bcrypt.compare(password,user.password);

        if(isVerify){
            const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
            return res.json({success:true,token});
        }else{
            return res.json({success:false,message:"Invalid user details"});
        }


    }catch(error){
        console.log(error);
        return res.json({success:false,message:error.message});
    }
};


// API for get profile data
const getProfile=async(req,res)=>{
    try{
        let userId=req.userId;

        const user=await userModel.findById(userId).select('-password');
        if(user){
            return res.json({success:true,user});
        }else{
            return res.json({success:false,message:"User not found Invalid user"});
        }

    }catch(error){
        console.log(error);
        return res.json({success:false,message:error.message});
    }
};

const editProfile=async(req,res)=>{
    try{
        const userId=req.userId;
        const {name,phone,address,dob,gender}=req.body;
        const imageFile=req.file;
        if(!name || !phone  || !dob || !gender){
            return res.json({success:false,message:"Data is missing"});
        }
        await userModel.findByIdAndUpdate(userId,{name,phone,address:JSON.parse(address),dob,gender});

        if(imageFile){
            // upload image to cloudinary
            const imageUpload=await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"});
            let imageUrl=imageUpload.secure_url;
            await userModel.findByIdAndUpdate(userId,{image:imageUrl});
        }

        return res.json({success:true,message:"User Data updated successfully"});

    }catch(error){
        console.log(error);
        return res.json({success:false,message:error.message});
    }
};


// API for slot booking
const appointmentBookin=async(req,res)=>{

    try {
        let userId=req.userId;
        let {docId,slotDate,slotTime}=req.body;


        const doctorData=await doctorModel.findById(docId).select('-password');

        if(!doctorData){
            return res.json({success:false,message:"Doctor data not found"});
        }

        if(!doctorData.available){
            return res.json({success:false,message:"Doctor is not available at this time"});
        }

        let slots_booked=doctorData.slots_booked;

        // checking for slot availability
        if(slots_booked[slotDate]){
            if(slots_booked[slotDate].includes(slotTime)){
                return res.json({success:false,message:"slot is not available "});
            }else{
                slots_booked[slotDate].push(slotTime);
            }
        }else{
            slots_booked[slotDate]=[];
            slots_booked[slotDate].push(slotTime);
        }

        const userData=await userModel.findById(userId).select('-password');

        delete doctorData.slots_booked; // not want to save unnecessary data in appointmentModel after we save tp doctorModel
        
        const appointmentData={
            userId,
            docId,
            userData,
            docData:doctorData,
            amount:doctorData.fees,
            slotTime,
            slotDate,
            date:Date.now(),
        };

        const newAppointment=new appointmentModel(appointmentData);
        await newAppointment.save();

        // saving sloat data in doctorModel
        await doctorModel.findByIdAndUpdate(docId,{slots_booked});

        res.json({success:true,message:"Appointment Booked"});

    }catch(error){
        console.log(error);
        return res.json({success:false,message:error.message});
    }
   


};




// API to get user Appointment->frontend MyAppointment.jsx
const listAppointment=async(req,res)=>{
    try{

        const userId=req.userId;
        const appointment=await appointmentModel.find({userId});
        
    
        return res.json({success:true,appointment});
    

    }catch(error){
        console.log(error);
        return res.json({success:false,message:error.message});
    }
};




// API for cancel appointment
const cancelAppointment=async(req,res)=>{
   try{
    
       const userId=req.userId;
       const {appointmentId}=req.body;
       

       const appointmentData=await appointmentModel.findById(appointmentId);

       // verify user
       if(appointmentData.userId!==userId){
          return res.json({success:false,message:"Unauthorize user"});

        }

        const {docId,slotDate,slotTime}=appointmentData;
        await appointmentModel.findByIdAndUpdate(appointmentId,{cancel:true});

        // finding doctor detail and updating doctor slot time

        const docData=await doctorModel.findById(docId);

        const slots_booked=docData.slots_booked;

        // updatind doctor by using filter

        slots_booked[slotDate]=slots_booked[slotDate].filter(e=>e!==slotTime);

        await doctorModel.findByIdAndUpdate(docId,{slots_booked});

        res.json({success:true,message:"Appointment cancel"});
        

    }catch(error){
      console.log(error);
      return res.json({success:false,message:error.message});
    }

};




// Creating new instance for razorpay

const razorpayInstance=new razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET
});


// API for appointment payment

const payment=async(req,res)=>{
    try{
        const {appointmentId}=req.body;

        const appointmentData=await appointmentModel.findById(appointmentId);

        if(!appointmentData || appointmentData.cancel){
            return res.json({success:false,message:"Appointment not found or already appointment is canceled"});
        }

        // Creating options for razorpay payment

        const options={
            amount:appointmentData.amount*100,
            currency:process.env.CURRENCY,
            receipt:appointmentId,
        };

        // Creating of an order

        const order= await razorpayInstance.orders.create(options);

        res.json({success:true,order})

    }catch(error){
        console.log(error);
        return res.json({success:false,message:error.message});
    }
};





// API to verify payment of razorpay
const varifyRazorpay=async(req,res)=>{
    try{

        const {razorpay_order_id}=req.body;

        const orderInfo=await razorpayInstance.orders.fetch(razorpay_order_id);

        if(orderInfo.status==='paid'){
            await appointmentModel.findByIdAndUpdate(orderInfo.receipt,{payment:true});
            return res.json({success:true,message:"Payment successfull"});
        }else{
            return res.json({success:false,message:"Payment Not Completed"});
        }

    }catch(error){
        console.log(error);
        return res.json({success:false,message:eroorr.message});
    }
}


export {userRegistration,userLogin,getProfile,editProfile,appointmentBookin,listAppointment,cancelAppointment,payment,varifyRazorpay};