import React,{useContext,useEffect} from "react";
import {AdminContext} from "../../context/AdminContext";

import {AppContext} from "../../context/AppContext";
import {assets} from "../../assets_admin/assets.js";
import {toast} from "react-toastify";
import axios from "axios";


const AllApointment=()=>{

    const {atoken,allAppointment,appointment,setAppointment,backendUrl,appointmentCancel}=useContext(AdminContext);

    const {calculateAge,slotdateFormate}=useContext(AppContext);
     
    
   
    
    useEffect(()=>{
        if(atoken){
           allAppointment();
           
        }
    }
    ,[atoken]);
    return(
        <div className="w-full max-w-6xl">
            <p className="mb-3 text-lg font-medium">All Appointment</p>
            <div className="bg-white border rounded text-sm min-h-[60vh] max-h-[80vh] overflow-y-scroll ">
                <div className="hidden sm:grid grid-col-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b">
                    <p>#</p>
                    <p>patient</p>
                    <p>Age</p>
                    <p>Date & Time</p>
                    <p>Doctor</p>
                    <p>Fees</p>
                    <p>Actions</p>
                </div>

                {appointment.map((item,index)=>(
                    
                        <div className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-200" key={index}>
                            <p className="max-sm:hidden">{index+1}</p>
                            <div className="flex items-center gap-2">
                                <img className="w-8 rounded-full" src={item.userData.image} alt=""/>
                                <p>{item.userData.name}</p>
                            </div>
                            <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>
                            <p>{slotdateFormate(item.slotDate)},{item.slotTime}</p>
                             <div className="flex items-center gap-2">
                                <img className="w-8 rounded-full" src={item.docData.image} alt=""/>
                                <p>{item.docData.name}</p>

                            </div>

                            <p>{item.docData.fees*100}</p>

                           <div> {item.cancel ? <p className="text-red-400">Canceled</p>:<button onClick={()=>appointmentCancel(item._id)} className=" border rounded rounded-full text-[20px] px-2 py-2 bg-blue-300 hover:bg-red-500 transition-full text-white">Cancel</button>}</div>
                            
                        </div>
                    
                ))
                }
            </div>
        </div>
    );
};

export default AllApointment;