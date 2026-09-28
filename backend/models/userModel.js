import mongoose from "mongoose";


const userSchema=new mongoose.Schema({
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
        default:"https://img.magnific.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80",
    },
    address:{
        type:Object,
        default:{
            line1:'',
            line2:'',

        },
    },
    gender:{
        type:String,
        default:"Not Selected",
    },
    dob:{
        type:String,
        default:"Not Selected",
    },
    phone:{
        type:String,
        default:"0000000000",
        minlength:10,
        maxlength:10,
    },

});


const userModel=mongoose.models.user || mongoose.model('user',userSchema);

export default userModel;