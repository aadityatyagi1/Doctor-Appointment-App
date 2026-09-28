import React,{useState,useContext} from "react";
import {assets} from "../assets_admin/assets.js";
import {AdminContext} from "../context/AdminContext";
import axios from "axios";
import {toast} from 'react-toastify';
import {DoctorContext} from "../context/DoctorContext";





const Login=()=>{
    const [state,setState]=useState("Admin");
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    

    const {setAtoken,backendUrl}=useContext(AdminContext);
    const {setDToken}=useContext(DoctorContext);

    const onSubmitHandler=async(event)=>{
      event.preventDefault();


   

    

      try{
        if(state=="Admin"){
          
          let {data}=await axios.post(backendUrl+'/api/admin/login',{email,password});
          


          if(data.success){
            
            localStorage.setItem('aToken',data.token);
            setAtoken(data.token);
          
          }
          else{
            
             toast.error(data.message);
       
          }
         }
        else{
          const {data}=await axios.post(backendUrl+'/api/doctor/login',{email,password});
          if(data.success){
            localStorage.setItem('dToken',data.dToken);
            setDToken(data.dToken);
            console.log(data.dToken);

          }else{
            toast.error(data.message);
          }
        }

      }catch(error){
        toast.error(error.message );
        
        

      }
    };


    return(
        <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center justify-center">
            <div className="flex flex-col gap-4 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border border-primary-300 rounded-lg shadow-sm">

                 <p className="text-2xl font-semibold"><span className="text-primary">{state}</span> Login</p>

                <div className="w-full">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>

                  <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" id="email" required className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-primary"placeholder="Enter your email"/>
                </div>

    <div className="w-full">
      <label htmlFor="password" className="text-sm font-medium text-primary-700">
        Password
      </label>

      <input onChange={(e)=>setPassword(e.target.value)} value={password}
        type="password"
        id="password"
        required
        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-primary"
        placeholder="Enter your password"
      />
    </div>

    <button  className=" text-white bg-blue-500 w-full py-2 rounded-md text-base">Login</button>
     {
        state=="Admin"?
        <p>Doctor Login? <span className="text-blue-500 underline cursor-pointer" onClick={()=>setState("Doctor")}>Click here</span></p>
        :<p>Admin Login <span className="text-blue-500 underline cursor-pointer" onClick={()=>setState("Admin")}>Click here</span></p>
     }
  </div>
</form>
    );
};

export default Login;