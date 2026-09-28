import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";

import appointmentModel from "../models/appointmentModel.js";

import jwt from "jsonwebtoken";


const changeAvailablity=async(req,res)=>{
    try{

        let {docId}=req.body;
        
        const docData=await doctorModel.findById(docId);
        await doctorModel.findByIdAndUpdate(docId,{available:!docData.available});
        return res.json({success:true,message:"Availability Change"});

    }catch(error){
        console.log(error);
        
        return res.json({success:false,message:error.message});
    }
   
};

const getDoctorData=async(req,res)=>{
    try{
        const doctor=await doctorModel.find({}).select('-password').select('-email');
        return res.json({success:true,doctor});
    }catch(error){
        console.log(error);
        return res.json({success:false,message:error.message});
    }
    


};

// API for doctor login
const doctorLogin=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const doctordata=await doctorModel.findOne({email});
        

        if(!doctordata){
            return res.json({success:false,message:"Invalid details"});
        }

        const passwordMatch=await bcrypt.compare(password,doctordata.password);

        if(passwordMatch){
           const dToken=jwt.sign({id:doctordata._id},process.env.JWT_SECRET);
           return res.json({success:true,dToken});

        }else{
            return res.json({success:false,message:"InCorrect Password!"});
        }


    }catch(error){
        console.log(error);
        return res.json({success:false,message:error.message});
    }
};

// API for allDoctor appointment
const allDoctorAppointment=async(req,res)=>{

    try{
        const docId=req.docId;
        const appointment=await appointmentModel.find({docId});
        console.log(appointment);
        if(appointment){
           return res.json({success:true,appointment});
        }else{
           return res.json({success:false,message:"No appointment booked for this doctor"});
        }
    }catch(error){
        console.log(error);
        return res.json({sucess:false,message:error.message});
    }

    
};




// API for appointment completion
const completeAppointment=async(req,res)=>{
    try{
        console.log("request comming");
        const {appointmentId}=req.body;
        console.log(appointmentId);
        const appointmentData=await appointmentModel.findById(appointmentId);
        
        if(appointmentData){
            const completeAppointment=await appointmentModel.findByIdAndUpdate(appointmentId,{isCompleted:true});
            return res.json({success:true,message:"Appointment Completed"});
        }else{
            return res.json({success:false,message:"Not found Appointment by this id"});
        }

    }catch(error){
        console.log(error);
        return res.json({success:false,message:error.message});
    }
};




// API for doctor cancel appointment
const doctorCancelAppointment=async(req,res)=>{
    try{
        console.log("comming");
        const {appointmentId}=req.body;
        const appointmentData=await appointmentModel.findById(appointmentId);


        const {docId,slotDate,slotTime}=appointmentData;

        await appointmentModel.findByIdAndUpdate(appointmentId,{cancel:true});

        const doctorData=await doctorModel.findById(docId);
        const slots_booked=doctorData.slots_booked;

        // filter doctor slot
        slots_booked[slotDate]=slots_booked[slotDate].filter(e=>e!==slotTime);

        // updatind doctor slots

        await doctorModel.findByIdAndUpdate(docId,{slots_booked});

        res.json({success:true,message:"Appointment Cancel!"});


    }catch(error){
        console.log(error);
        return res.json({success:false,message:error.message});
    }
};

// API for doctor dashboard




const doctorDashBoard=async(req,res)=>{
    try{
        
        const docId=req.docId;
        

        const appointment=await appointmentModel.find({docId});

        let earning=0;

        appointment.map((item)=>{
            if(item.isCompleted || item.payment){
                earning+=item.amount*100;
            }
        });

        let patients=[];
        appointment.map((item)=>{
            if(!patients.includes(item.userId)){
                patients.push(item.userId);
            }
        });

        const dashBoardData={
            earning,
            appointment:appointment.length,
            patients:patients.length,
            latestAppointment:[...appointment].reverse().slice(0,6),
            docId:appointment.docId
        }
        

         


        return res.json({success:true,dashBoardData});


    }catch(err){
        console.log(err);
        return res.json({success:false,message:err.message});
    }

};

// API to get doctor data
const getDoctorProfile=async(req,res)=>{
   try{
    
       const docId=req.docId;

       const profileData=await doctorModel.findById(docId);
      

       if(profileData){
           
           return res.json({success:true,profileData});
        }else{
            return res.json({success:false,message:"Invalid DoctorId"});
        }

    }catch(error){
      console.log(error);
      return res.json({success:false,message:error.message});
    }
};



// API for edit DoctorProfile


const editDoctorProfile=async(req,res)=>{
    try{
        console.log("comming");

        const docId=req.docId;
        const {fees,available,address}=req.body;

        const doctorData=await doctorModel.findByIdAndUpdate(docId,{fees,available,address});
        
        return res.json({success:true,message:"Updated Doctor profile"});

    }catch(error){
        return res.json({success:false,message:error.message});
    }
};

export {changeAvailablity,getDoctorData,doctorLogin,allDoctorAppointment,completeAppointment,doctorCancelAppointment,doctorDashBoard,getDoctorProfile,editDoctorProfile};