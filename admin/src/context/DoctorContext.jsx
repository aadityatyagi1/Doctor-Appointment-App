import React,{createContext,useState,useEffect} from "react";
import axios from "axios";

import {toast} from "react-toastify";


export const DoctorContext=createContext();

const DoctorContextProvider=(props)=>{

    const backendUrl=import.meta.env.VITE_BACKEND_URL;
    const [dToken,setDToken]=useState(localStorage.getItem('dToken')?localStorage.getItem('dToken'):"");
    const [appointment,setAppointment]=useState([]);

    const [dashboard,setDashboard]=useState(false);
    const [profileData,setProfileData]=useState(false);
    

    const allAppointment=async()=>{
          try{
            const {data}=await axios.get(backendUrl+'/api/doctor/allDoctorAppointment',{headers:{dToken:dToken}});
            if(data.success){
                setAppointment(data.appointment);

                console.log(data.appointment);
            }

          }catch(error){
            console.log(error);
            toast.error(error.message);
          }

        };

        // complete appointment

        const completeAppointment=async(appointmentId)=>{
            try{
                const {data}=await axios.post(backendUrl+'/api/doctor/completeAppointment',{appointmentId:appointmentId},{headers:{dToken}});
                if(data.success){
                    toast.success(data.message);
                }else{
                    toast.error(data.message);
                }

            }catch(error){
                console.log(error);
                toast.error(error.message);
            }
        };


        // cancel appointment
        const appointmentCancel=async(appointmentId)=>{
            try{
                const {data}=await axios.post(backendUrl+'/api/doctor/doctorCancelAppointment',{appointmentId:appointmentId},{headers:{dToken}});
                if(data.success){
                    toast.success(data.message);
                }else{
                    toast.error(data.message);
                }

            }catch(error){
                toast.error(error.message);
            }
        };

        const dashboardData=async()=>{
            try{
                const {data}=await axios.get(backendUrl+'/api/doctor/getDashboardData',{headers:{dToken}});
                if(data.success){
                    setDashboard(data.dashBoardData);
                }else{
                    toast.error(data.message);
                }

            }catch(error){
                toast.error(error.message);
            }
        };



        // profile data
        const getProfileData=async()=>{
            try{
                const {data}=await axios.get(backendUrl+'/api/doctor/getProfile',{headers:{dToken}});
                if(data.success){
                   setProfileData(data.profileData);
                   console.log(data.profileData); 
                }

            }catch(error){
                toast.error(error.message);
            }
        };

       



    const value={
        dToken,setDToken,backendUrl,allAppointment,appointment,setAppointment,completeAppointment,appointmentCancel,dashboardData,
        dashboard,setDashboard,getProfileData,profileData,setProfileData

    };

   


    return(
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    );
};


export default DoctorContextProvider;