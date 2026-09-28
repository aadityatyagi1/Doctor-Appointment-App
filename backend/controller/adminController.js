import validator from "validator";
import bcrypt from "bcrypt";
import {v2 as cloudinary} from 'cloudinary';
import doctorModel from "../models/doctorModel.js"; 
import jwt from "jsonwebtoken";


import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";






// API for adding doctor
const addDoctor=async(req,res)=>{
    try{
        
        const {name,email,password,speciality,degree,experience,about,fees,address}=req.body;
        const imageFile=req.file;

        // checking for all data to add doctor
        if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address){
            return res.json({success:false,message:"Missing Details"});
        }

        // validating email format
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid email"});
        }
        
        // validating strong password
        if(password.length<8){
            return res.json({success:false,message:"Enter strong password more than 8 digit"});
        }

        // generating encrypy hash
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);


        // uplode image to cloudinary

        let imageUrl;

       if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(
                    imageFile.path,
                    { resource_type: "image" }
            );

           imageUrl = imageUpload.secure_url;
        }

        const doctorData={
            name,
            email,
            image:imageUrl,
            password:hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address:JSON.parse(address),
            date:Date.now()
        }

        const newDoctor=new doctorModel(doctorData);
        await newDoctor.save();
       return  res.json({success:true,message:"Doctor Added"});


    }
    catch(error){
        console.log(error);
       return res.json({success:false,message:error.message});
         
    }
};

// API for admin Login

const loginAdmin=async(req,res)=>{
    try{
           let {email,password}=req.body;
           
           if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
           const token=jwt.sign({email,password},process.env.JWT_SECRET);
            return res.json({success:true,token});
          }
          else{
            return res.json({success:false,message:error.message});

          }

    }
    catch(error){
        console.log(error);
       return res.json({success:false,message:error.message});
    }
    
};

// API to get all doctors list for admin panel

const allDoctors=async(req,res)=>{
    try{
        const doctor=await doctorModel.find({}).select('-password');
        return res.json({success:true,doctor});

    }catch(error){
        console.log(error);
        return res.json({success:false,message:error.message});
    }
};


// API for getting all Appointment data 

const appointmentAdmin=async(req,res)=>{
    try{

        
        const appointment=await appointmentModel.find({});

        if(appointment){
            return res.json({success:true,appointment});
        }else{
            return res.json({success:false,message:"No appointment is there"});
        }
        

    }catch(error){
        console.log(error);
        return res.json({success:false,message:error.message});
    }
};


// API for admin appointment cancel
const adminAppointmentCancel=async(req,res)=>{
    try{
        console.log("comming");
        const {appointmentId}=req.body;

       
        const appData=await appointmentModel.findById(appointmentId);

        const {slotDate,slotTime}=appData;

        

        

        if(appData){
            await appointmentModel.findByIdAndUpdate(appointmentId,{cancel:true});
            const docData=await doctorModel.findById(appData.docId);
            const slots_booked=docData.slots_booked;
            slots_booked[slotDate]=slots_booked[slotDate].filter((e)=>e!==slotTime);

            await doctorModel.findByIdAndUpdate(appData.docId,{slots_booked});
            res.json({success:false,message:"Appointment Cancel"});
        }else{
            return res.json({success:false,message:"Not Found Data"});

        }
    }catch(error){
        console.log(error);
        return res.json({success:false,message:error.message});
    }
   

};

// API for DashBoard
const dataForDashboard=async(req,res)=>{
    try{
       

        const docData=await doctorModel.find({});
        const userData=await  userModel.find({});
        const appointment=await  appointmentModel.find({});

        const dashBoardData={
            docData:docData.length,
            userData:userData.length,
            appointment:appointment.length,
            latestAppointment:appointment.reverse().slice(0,5),
            
        };

        res.json({success:true,dashBoardData});

    }catch(error){
        console.log(error);
        return res.json({success:false,message:error.message});
    }
};


export {addDoctor,loginAdmin,allDoctors,appointmentAdmin,adminAppointmentCancel,dataForDashboard};