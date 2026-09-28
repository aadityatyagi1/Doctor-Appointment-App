import React,{useContext,useState,useEffect} from "react";
import axios from "axios";

import {useNavigate} from "react-router-dom";

import {toast} from "react-toastify";

import {AppContext} from "../context/AppContext";




const MyAppointment=()=>{

  const navigate=useNavigate();


    const {backendUrl,token,getDoctorData}=useContext(AppContext);

    const [appointment,setAppointment]=useState([]);

    const getUserAppointment=async()=>{

      try{
        let {data}=await axios.get(backendUrl+'/api/user/appointment',{headers:{token:token}});
        console.log(data.appointment.reverse());
        console.log(data);
        if(data.success){
          setAppointment(data.appointment)
          
        }else{
          toast.error(data.message);
        }

      }catch(error){
        console.log(error);
        toast.error(error.message);
      }

    };

    const cancelAppointment=async(appointmentId)=>{
      try{
        console.log(appointmentId);
        const {data}=await axios.post(backendUrl+'/api/user/cancelAppointment',{appointmentId},{headers:{token:token}});
        if(data.success){
          toast.success("Appointment Cancel");
          getUserAppointment();
          getDoctorData();
          
        }else{
          toast.error(data.message);
        }

      }catch(error){
        console.log(error);
        toast.error(error.message);
      }
    };

    

    const initPay=async(order)=>{

      const options={
        key:import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount:order.amount,
        currency:order.currency,
        name:'Appointment Payment',
        description:'Appointment Payment',
        order_id:order.id,
        receipt:order.receipt,
        handler:async (response)=>{
          console.log(response);
          try{

            const {data}=await axios.post(backendUrl+'/api/user/verifyPayment',{razorpay_order_id:response.razorpay_order_id},{headers:{token:token}});
            if(data.success){
              getUserAppointment();
              getDoctorData();
              navigate("/myappointment");
              toast.success(data.message);
            }else{
              toast.error(data.message);
            }

          }catch(error){
            console.log(error);
            toast.error(error.message);
          }
          
        }
      }

      const rzp=new window.Razorpay(options);
      rzp.open();
    }



    const payOnline=async(appointmentId)=>{
      try{
        const {data}=await axios.post(backendUrl+'/api/user/payment',{appointmentId},{headers:{token:token}});
        if(data.success){
          initPay(data.order);
          
        }

      }catch(error){
        console.log(error);
        toast.error(error.message);
      }
    };





    useEffect(()=>{
      if(token){
        getUserAppointment()
      }else{
        toast.warn("Please Login/Sign Up");
      }
    }
    ,[token]);


    return appointment &&(
     <div className="max-w-4xl mx-auto px-4 py-8">

  <p className="text-2xl font-semibold text-gray-800 mb-6">
    My Appointments
  </p>

  <div className="space-y-5">
    {appointment.map((item, index) => {
      return (
        <div
          key={index}
          className="border border-gray-200 rounded-xl p-5
                     shadow-sm hover:scale-105 hover:shadow-md transition-all duration-200
                     bg-white"
        >

          {/* Doctor Information */}
          <div className="flex flex-col sm:flex-row gap-6">

            {/* Doctor Image */}
            <div className="flex-shrink-0">
              <img
                src={item.docData.image}
                alt={item.docData.name}
                className="w-32 h-32 object-cover rounded-lg bg-blue-50"
              />
            </div>

            {/* Doctor Details */}
            <div className="flex-1">

              <p className="text-xl font-semibold text-gray-800">
                {item.docData.name}
              </p>

              <p className="text-sm text-gray-500 mt-1">
                {item.docData.speciality}
              </p>

              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700">
                  Address:
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  {item.docData.address.line1}
                </p>

                <p className="text-sm text-gray-500">
                  {item.docData.address.line2}
                </p>
              </div>

              {/* Date & Time */}
              <p className="text-sm text-gray-700 mt-4">
                <span className="font-medium">
                  Date & Time:
                </span>{" "}
                {item.slotDate} | {item.slotTime} 
              </p>

            </div>

            {/* Buttons */}
            <div className="flex sm:flex-col gap-3 justify-end">
                
                {!item.cancel && item.payment && !item.isCompleted && <button className="px-5 py-2 border border-blue-500 bg-blue-500 rounded-full text-white">Paid</button>}
                {!item.cancel && !item.payment && !item.isCompleted && <button onClick={()=>payOnline(item._id)}
                className="px-5 py-2 border border-blue-500
                           text-blue-500 rounded-lg text-sm
                           hover:bg-blue-500 hover:text-white
                           transition-all duration-500"
              >
                Pay Online
              </button> }
              
              {!item.cancel && !item.isCompleted &&  <button onClick={()=>cancelAppointment(item._id)}
                className="px-5 py-2 border border-red-400
                           text-red-500 rounded-lg text-sm
                           hover:bg-red-500 hover:text-white
                           transition-all duration-500"
              >
                Cancel appointment
              </button>}

              {item.cancel && !item.isCompleted && <button className="px-5 py-2 border border-red-500 text-white bg-red-500 rounded-full">Canceled Appointment</button>}
              {item.isCompleted && <button className="border border-blue-200 rounded-full px-2 py-2 bg-blue-200">Completed</button>}
             

            </div>

          </div>

        </div>
      );
    })}
  </div>

</div>
    );
};

export default MyAppointment;