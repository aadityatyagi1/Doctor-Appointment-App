import jwt from "jsonwebtoken";
const authDoctor=async(req,res,next)=>{
    try{
        
        const dToken=req.header('dToken');
        
        if(!dToken){
            return res.json({success:false,message:"Invalid or expire token"});

        }

        const decode_token= jwt.verify(dToken,process.env.JWT_SECRET);
        req.docId=decode_token.id;
        
        next();

    }catch(error){
        console.log(error);
        return res.json({success:false,message:error.message});
    }
};

export default authDoctor;