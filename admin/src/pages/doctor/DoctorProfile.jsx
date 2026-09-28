import {React,useContext,useEffect,useState} from "react";
import {toast} from "react-toastify";

import {DoctorContext} from "../../context/DoctorContext";
import {AppContext} from "../../context/AppContext";
import axios from "axios";



const DoctorProfile=()=>{
    const {getProfileData,dToken,profileData,setProfileData,backendUrl}=useContext(DoctorContext);


    const [isEdit,setIsEdit]=useState(false);

    const updateProfile=async()=>{
        try{
            const Data={
                address:profileData.address,
                fees:profileData.fees,
                available:profileData.available
            }

            const {data}=await axios.post(backendUrl+'/api/doctor/editProfile',Data,{headers:{dToken:dToken}});
            if(data.success){
                getProfileData();
                setIsEdit(false);
                toast.success(data.message);
            }else{
                toast.error(data.message);
            }

        }catch(error){
            toast.error(error.message);
        }
    };

    useEffect(()=>{
        if(dToken){
            getProfileData();
        }

    },[dToken]);
    return profileData && (
        <div>
            <div className="flex flex-col gap-4 m-5">
                <div>
                    <img className="bg-blue-400 w-full sm:max-w-64 rounded-lg" src={profileData.image} alt=""/>
                </div>
                <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white">
                    {/* docData -> name,degree,experience */}
                    <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">{profileData.name}</p>
                    <div className="flex items-center gap-2 mt-1 text-gray-600">
                        <p>{profileData.degree}--{profileData.speciality}</p>
                        <button className="py-0.5 px-2 border text-xs rounded-full">{profileData.experience}</button>
                    </div>

                     {/* Doctor About */}
                     <div>
                        <p className="flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3">About:</p>
                        <p>
                            {profileData.about}
                        </p>
                     </div>
                     <p className="text-gray-600 font-medium mt-4">
                        Appointment Fees: <span className="text-gray-800">&#8377;{isEdit?<input type="Number" onChange={(e)=>setProfileData(prev=>({...prev,fees:e.target.value}))} value={profileData.fees}></input> :profileData.fees*100}</span>
                     </p>

                     <div className="flex gap-2 py-2">
                        <p>Address:</p>
                        <p className="text-sm">
                            {isEdit?<input type="text" onChange={(e)=>setProfileData(prev=>({...prev,address:{...prev.address,line1:e.target.value}}))} value={profileData.address.line1}></input> :profileData.address.line1}
                            <br/>
                            {isEdit?<input type="text" onChange={(e)=>setProfileData(prev=>({...prev,address:{...prev.address,line2:e.target.value}}))} value={profileData.address.line2}></input>:profileData.address.line2}
                        </p>
                     </div>

                     <div className="flex gap-1 pt-2">
                        <input  onChange={()=>isEdit && setProfileData(prev=>({...prev,available:!prev.available}))} checked= {profileData.available} type="checkbox" name="" id=""/>
                        <label htmlFor="">Available</label>
                        

                     </div>
                     {
                        !isEdit?
                        <button onClick={()=>setIsEdit(true)} className="px-4 py-1 border border-red-400 text-sm rounded-full mt-5 bg-red-200 hover:bg-red-400 hover:text-white transition-all">Edit</button>
                        :<button  onClick={updateProfile} className="px-4 py-1 border border-pink-400 text-sm rounded-full mt-5 bg-pink-200 hover:bg-pink-400 hover:text-white transition-all">Save</button>

                     }

                     
                     
                </div>
            </div>
        </div>
    );
}

export default DoctorProfile;