import {createContext,useEffect,useState} from "react";

import axios from "axios";
import {toast} from "react-toastify";

export const AppContext=createContext();

const AppContextProvider=(props)=>{
    const [doctors,setDoctors]=useState([]);
    const currencySymbol="$";
    const backendUrl=import.meta.env.VITE_BACKEND_URL;
    

    const [token,setToken]=useState(localStorage.getItem('token')?localStorage.getItem('token'):false);

    const [userData,setUserData]=useState(false);

    const getDoctorData=async()=>{
        try{
            let {data}=await axios.get(backendUrl+'/api/doctor/list');
            if(data.success){
                setDoctors(data.doctor);
                
            }else{
                toast.error(data.message);
            }


        }catch(error){
            console.log(error);
            toast.error(error.message);
        }
    };

    const getUserData=async()=>{
        try{
            let {data}=await axios.post(backendUrl+'/api/user/getProfile',{},{headers:{token:token}});
            if(data.success){
                setUserData(data.user);
            }else{
                toast.error(data.message);
            }

        }catch(error){
            console.log(error);
            toast.error(error.message);
        }
    };

    const value={
        doctors,getDoctorData,
        currencySymbol,
        token,setToken,
        backendUrl,
        userData,setUserData,getUserData
    }

    useEffect(()=>{
        getDoctorData();
    }
    ,[]);

    useEffect(()=>{
        if(token){
            getUserData();
        }else{
            setUserData(false);
        }
    }
    ,[token])

    return(
        <AppContext.Provider value={value}>
            {props.children}

        </AppContext.Provider>
    );
}

export default AppContextProvider;