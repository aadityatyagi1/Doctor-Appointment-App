import React,{useContext,useState,useEffect} from "react";
import axios from "axios";

import {toast} from "react-toastify";
import {AdminContext} from "../../context/AdminContext";
import {AppContext} from "../../context/AppContext";
import {assets} from "../../assets_admin/assets.js";



const Dashboard=()=>{

    const [dashboardData,setDashboardData]=useState(false);


    const {backendUrl,atoken,appointmentCancel}=useContext(AdminContext);

    const {slotdateFormate}=useContext(AppContext);

    const dashboard=async()=>{
        const {data}=await axios.get(backendUrl+'/api/admin/dashboardData',{headers:{atoken}});
        if(data.success){
            
            setDashboardData(data.dashBoardData);
            console.log(data.dashBoardData);
            


        }else{
            toast.error(data.message);
        }
    };

    useEffect(()=>{
        if(atoken){
          dashboard();
        }
    },[atoken]);
    return dashboardData &&(
        <div className="m-5">
            <div className="flex flex-wrap gap-8">
                <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-blue-200 cursor-pointer hover:scale-150 transition-all">
                    <img className="w-14" src={assets.doctor_icon} alt=""/>
                    <p className="text-[10px] hover:text-[20px] hover:underline hover:decoration-blue-300 transition-all">{dashboardData.docData}</p>
                    <p className="text-[10px] hover:text-[15px] hover:underline hover:decoration-green-300 transition-all">Doctor</p>
                </div>
                 <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-blue-200 cursor-pointer hover:scale-150 transition-all">
                    <img className="w-14" src={assets.patients_icon} alt=""/>
                    <p className="text-[10px] hover:text-[20px] hover:underline hover:decoration-blue-300 transition-all">{dashboardData.userData}</p>
                    <p className="text-[10px] hover:text-[15px] hover:underline hover:decoration-green-300 transition-all">Paitent</p>
                </div>
                 <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-blue-200 cursor-pointer hover:scale-150 transition-all">
                    <img className="w-14" src={assets.appointment_icon} alt=""/>
                    <p className="text-[10px] hover:text-[20px] hover:underline hover:decoration-blue-300 transition-all">{dashboardData.appointment}</p>
                    <p className="text-[10px] hover:text-[15px] hover:underline hover:decoration-green-300 transition-all">Appointment</p>
                </div>
            </div>

            <div className="bg-white">
                <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounnded-t border">
                    <img src={assets.list_icon}/>
                    <p className="font-semibold">Latest Appointment</p>
                </div>
                <div>
                    {
                       dashboardData.latestAppointment.map((item,index)=>{
                        return(
                            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300" key={index}>
                                <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 shrink-0">
                                    <img className="w-full h-full object-cover" src={item.docData.image} alt=""/>
                                    
                                </div>
                                <div className="flex-1">
                                    <p className="text-gray-800 font-semibold text-sm">{item.docData.name}</p>
                                    <p className="text-gray-500 text-xs mt-1">{slotdateFormate(item.slotDate)}</p>
                                </div>
                                
                                <div>
                                    {item.cancel ? 
                                    <p className="text-red-400 text-xs font-medium">Canceled</p>
                                    :<button onClick={()=>appointmentCancel(item._id)} className=" border rounded rounded-full text-[20px] px-2 py-2 bg-red-300 hover:bg-red-500 transition-full text-white">Cancel</button>
                                    }
                                </div>
                                </div>
                            </div>
                        );
                       }) 
                    }
                </div>
            </div>
        </div>
    );
};

export default Dashboard;