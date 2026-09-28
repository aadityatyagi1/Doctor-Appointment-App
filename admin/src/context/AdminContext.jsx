import React, {createContext,useState,useEffect} from "react";
import axios from "axios";
import {toast} from "react-toastify";



export const AdminContext=createContext();

const AdminContextProvider=(props)=>{
    const [atoken,setAtoken]=useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):"");
    const [doctors,setDoctors]=useState([]);


    const [appointment,setAppointment]=useState([]);

    const backendUrl=import.meta.env.VITE_BACKEND_URL;

  
    

      const getAllDoctors=async()=>{
        try{
            let {data}=await axios.post(backendUrl+'/api/admin/all-doctors',{} ,{headers:{atoken:atoken}});
            if(data.success){
                setDoctors(data.doctor);
                console.log(data.doctor);
            }else{
                toast.error(data.message);

            }

        }catch(error){
            console.log(error);
            toast.error(error.message);

        }
      };

      const changeAvailability=async(docId)=>{
        try{
            let {data}=await axios.post(backendUrl +'/api/admin/change-availability',{docId},{headers:{atoken:atoken}});
            if(data.success){
                toast.success("availilality change");
                getAllDoctors();
            }else{
                toast.error(data.message);
            }

        }catch(error){
            toast.error(error.message);
        }
      };

     

    const allAppointment=async()=>{
        try{
            const {data}=await axios.get(backendUrl+'/api/admin/appointmentAdmin',{headers:{atoken}});
            if(data.success){
                setAppointment(data.appointment);
                console.log(data.appointment);

            }else{
                toast.error(data.message);
            }

        }catch(error){
            console.log(error);
            toast.error(error.message);
        }
    };

     const appointmentCancel=async(appointmentId)=>{
            try{
                console.log("clicked");
                const {data}=await axios.post(backendUrl+'/api/admin/adminAppointmentCancel',{appointmentId},{headers:{atoken}});
                if(data.success){
                   toast.success(data.message);
                   allAppointment();
                   
    
                }else{
                    toast.error(data.message);
                }
    
            }catch(error){
                console.log(error);
                toast.error(error.message);
    
            }
    
        };

     const value={
        atoken,setAtoken ,backendUrl,doctors,getAllDoctors,changeAvailability,
        allAppointment,appointment,setAppointment,appointmentCancel

    };

    

   
    return(
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    );

};

export default AdminContextProvider;