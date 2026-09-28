// Getting user id from the token whic is send by the user in the request
import jwt from "jsonwebtoken";

const authUser=async(req,res,next)=>{

    try{
        const {token}=req.headers;

        if(!token){
            return res.json({success:false,message:"Invalid use not have token"});
        }

        const decode_token=jwt.verify(token,process.env.JWT_SECRET);
        req.userId=decode_token.id;

        next();

    }catch(error){
        console.log(error);
        return res.json({success:false,message:error.message});
    }
    
    


};

export {authUser};