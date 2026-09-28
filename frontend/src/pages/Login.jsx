import React,{useState,useContext,useEffect} from "react";
import {AppContext} from "../context/AppContext";
import {toast} from "react-toastify";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Login=()=>{
  const navigate=useNavigate();
    const [state,setState]=useState("sign up");


    const {token,setToken,backendUrl}=useContext(AppContext);

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [name,setName]=useState('');

    const onSubmitHandler=async(event)=>{
      console.log("onSubmit req is comming");
        event.preventDefault();

      try{
        if(state=="sign up"){
          let {data}= await axios.post(backendUrl+'/api/user/register',{name,email,password});
          if(data.success){
            localStorage.setItem("token",data.token);
            setToken(data.token);
            console.log(data.token);

          }else{
            toast.error(data.message);
          }
        }else{
          let {data}=await axios.post(backendUrl+'/api/user/login',{email,password});
          if(data.success){
            localStorage.setItem("token",data.token);
            setToken(data.token);
            console.log(data.token);
          }else{
            toast.error(data.message);
          }
        }

      }catch(error){
        console.log(error);
        toast.error(error.message);
      }


    };

    useEffect(()=>{
      if(token){
        navigate('/');

      }
      
    }
    ,[token]);







    return(
        <form onSubmit={(e)=>onSubmitHandler(e)} className="min-h-[80vh] flex items-center justify-center bg-gray-50">
  <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">

    <p className="text-2xl font-semibold text-gray-800 mb-2">
      {state === "sign up" ? "Create Account" : "Login"}
    </p>

    <p className="text-sm text-gray-500 mb-6">
      Please {state === "sign up" ? "signup" : "login"} to book appointment
    </p>

    {state === "sign up" && (
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Full Name
        </label>

        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg
                     outline-none focus:ring-2 focus:ring-blue-500
                     focus:border-blue-500"
          placeholder="Enter your full name"
        />
      </div>
    )}

    <div className="mb-4">
      <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Email
      </label>

      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg
                   outline-none focus:ring-2 focus:ring-blue-500
                   focus:border-blue-500"
        placeholder="Enter your email"
      />
    </div>

    <div className="mb-6">
      <label
        htmlFor="password"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Password
      </label>

      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg
                   outline-none focus:ring-2 focus:ring-blue-500
                   focus:border-blue-500"
        placeholder="Enter your password"
      />
    </div>

    <button
      type="submit"
      className="w-full bg-blue-600 text-white py-2.5 rounded-lg
                 font-medium hover:bg-blue-700 transition duration-200"
    >
      {state === "sign up" ? "Sign up" : "Login"}
    </button>
    {
       state== "sign up"? <p>Already have an account!<span onClick={()=>setState("login")} className="text-primary underline cursor-pointer">Login here</span> </p>:<p>Create an new account? <span onClick={()=>setState("sign up")} className="text-primary underline cursor-pointer">click here </span> </p>
    }

  </div>
</form>
    );
};

export default Login;