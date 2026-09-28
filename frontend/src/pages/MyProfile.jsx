import React,{useState,useContext,useEffect} from "react";
import { assets } from "../assets_frontend/assets.js";

import {toast} from "react-toastify";

import {AppContext} from "../context/AppContext";

import axios from "axios";


const MyProfile=()=>{

  const {userData,setUserData,token,backendUrl,getUserData}=useContext(AppContext);

  const [image,setImage]=useState(false);

  
   
    const [isEdit ,setIsEdit]=useState(false);

   const updateUserProfileData=async()=>{
    try{
      const formData=new FormData();

      formData.append("name",userData.name);
      formData.append("phone",userData.phone);
      formData.append("address",JSON.stringify(userData.address));
      formData.append("gender",userData.gender);
      formData.append("dob",userData.dob);

      image && formData.append("image",image);

      const {data}=await axios.post(backendUrl+'/api/user/editProfile',formData,{headers:{token:token}});
      if(data.success){
        toast.success(data.message);
        await getUserData();
        setIsEdit(false);
        setImage(false);

      }else{
        toast.error(data.message);
      }

    }catch(error){
      console.log(error);
      toast.error(error.message);
    }
   };

    return userData &&(
       <div className="max-w-3xl mx-auto px-6 py-10">

  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">

    <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">

      {
        isEdit?
        <label htmlFor="image">
          <div className="inline-block relative cursor-pointer">
            <img className="w-36 rounded opacity-75" src={image?URL.createObjectURL(image):userData.image} alt=""/>
            
          </div>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden/>
        </label>
        : <img
        src={userData.image}
        alt="Profile"
        className="w-28 h-28 rounded-full object-cover border-4 border-gray-100"
      />
      }

    
     

      <div className="flex-1">
        {isEdit ? (
          <input
            type="text"
            value={userData.name}
            onChange={(e) =>
              setUserData(prev => ({
                ...prev,
                name: e.target.value
              }))
            }
            className="w-full max-w-md px-4 py-2 border border-gray-300
                       rounded-lg outline-none focus:ring-2
                       focus:ring-blue-500"/>) 
                       : ( <p className="text-2xl font-semibold text-gray-800">
            {userData.name}
          </p>
        )}
      </div>

    </div>

    <hr className="my-8 border-gray-200" />

    <div>
      <p className="text-lg font-semibold text-gray-800 mb-5">
        Contact Information
      </p>

      <div className="space-y-5">

        {/* Email */}
        <div>
          <p className="text-sm text-gray-500 mb-1">
            Email ID
          </p>

          <p className="text-blue-800">
            {userData.email}
          </p>
        </div>

        {/* Phone */}
        <div>
          <p className="text-sm text-gray-500 mb-1">
            Phone
          </p>

          {isEdit ? (
            <input
              type="text"
              value={userData.phone}
              onChange={(e) =>
                setUserData(prev => ({
                  ...prev,
                  phone: e.target.value
                }))
              }
              className="w-full max-w-md px-4 py-2 border border-gray-300
                         rounded-lg outline-none focus:ring-2
                         focus:ring-blue-500"
            />
          ) : (
            <p className="text-blue-800">
              {userData.phone}
            </p>
          )}
        </div>

        {/* Address */}
        <div>
          <p className="text-sm text-gray-500 mb-1">
            Address
          </p>

          {isEdit ? (
            <div className="space-y-3 max-w-md">

              <input
                type="text"
                value={userData.address.line1}
                onChange={(e) =>
                  setUserData(prev => ({
                    ...prev,
                    address: {
                      ...prev.address,
                      line1: e.target.value
                    }
                  }))
                }
                className="w-full px-4 py-2 border border-gray-300
                           rounded-lg outline-none focus:ring-2
                           focus:ring-blue-500"
                placeholder="Address line 1"
              />

              <input
                type="text"
                value={userData.address.line2}
                onChange={(e) =>
                  setUserData(prev => ({
                    ...prev,
                    address: {
                      ...prev.address,
                      line2: e.target.value
                    }
                  }))
                }
                className="w-full px-4 py-2 border border-gray-300
                           rounded-lg outline-none focus:ring-2
                           focus:ring-blue-500"
                placeholder="Address line 2"
              />

            </div>
          ) : (
            <p className="text-gray-800 leading-6">
              {userData.address.line1}
              <br />
              {userData.address.line2}
            </p>
          )}
        </div>

      </div>
    </div>

    <hr className="my-8 border-gray-200" />

    {/* Basic Information */}
    <div>
      <p className="text-lg font-semibold text-gray-800 mb-5">
        Basic Information
      </p>

      <div className="space-y-5">

        {/* Gender */}
        <div>
          <p className="text-sm text-gray-500 mb-1">
            Gender
          </p>

          {isEdit ? (
            <select
              value={userData.gender}
              onChange={(e) =>
                setUserData(prev => ({
                  ...prev,
                  gender: e.target.value
                }))
              }
              className="w-full max-w-md px-4 py-2 border border-gray-300
                         rounded-full bg-white outline-none focus:ring-2
                         focus:ring-blue-500"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className="text-gray-800">
              {userData.gender}
            </p>
          )}
        </div>

        {/* Birthday */}
        <div>
          <p className="text-sm text-gray-500 mb-1">
            Birthday
          </p>

          {isEdit ? (
            <input
              type="date"
              value={userData.dob}
              onChange={(e) =>
                setUserData(prev => ({
                  ...prev,
                  dob: e.target.value
                }))
              }
              className="w-full max-w-md px-4 py-2 border border-gray-300
                         rounded-full outline-none focus:ring-2
                         focus:ring-blue-500"
            />
          ) : (
            <p className="text-gray-800">
              {userData.dob}
            </p>
          )}
        </div>

      </div>
    </div>

    {/* Button */}
    <div className="mt-8">

      {isEdit ? (
        <button
          onClick={updateUserProfileData}
          className="px-6 py-2.5 bg-blue-600 text-white
                     rounded-lg font-medium hover:bg-blue-700
                     transition duration-200"
        >
          Save Information
        </button>
      ) : (
        <button
          onClick={() => setIsEdit(true)}
          className="px-6 py-2.5 border border-blue-600
                     text-blue-600 rounded-lg font-medium
                     hover:bg-blue-50 transition duration-200"
        >
          Edit
        </button>
      )}

    </div>

  </div>
</div>
    );
};

export default MyProfile;