import mongoose from "mongoose";


const doctorSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
        default:"https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9jdG9yfGVufDB8fDB8fHww",
    },
    speciality:{
        type:String,
        required:true,
    },
    degree:{
        type:String,
        required:true,
    },
    experience:{
        type:String,
        required:true,
    },
    about:{
        type:String,
        required:true,
    },
    available:{
        type:Boolean,
        default:true,
    },
    fees:{
        type:String,
        required:true,
    },
    address:{
        type:Object,
        required:true,
    },
    date:{
        type:Number,
        required:true,
    },
    slots_booked:{
        type:Object,
        default:{},
    },

},{minimize:false});


const doctorModel=mongoose.models.doctor || mongoose.model('doctor',doctorSchema);

export default doctorModel;