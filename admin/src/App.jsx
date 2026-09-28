import React,{useContext} from "react";
import {Routes,Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import AddDoctor from "./pages/admin/AddDoctor";
import AllApointment from "./pages/admin/AllApointment";
import Dashboard from "./pages/admin/Dashboard";
import DoctorList from "./pages/admin/DoctorList";

import Login from "./pages/Login";
import {AdminContext} from "./context/AdminContext";

import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


import {DoctorContext} from "./context/DoctorContext";

import DoctorAppointment from "./pages/doctor/DoctorAppointment";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import DoctorProfile from "./pages/doctor/DoctorProfile";




const App=()=>{
  const {atoken}=useContext(AdminContext);

  const {dToken}=useContext(DoctorContext);

  return atoken || dToken ? (
    <div className="">
      
      <ToastContainer/>
      <Navbar/>
      <div className="flex items-start">
        <Sidebar/>

        {/* Admin Router */}
        <Routes>
          <Route path="/" element={<></>}></Route>
          <Route path="/admin-dashboard" element={<Dashboard/>}></Route>
          <Route path="/add-doctor" element={<AddDoctor/>}></Route>
          <Route path="/all-appointments" element={<AllApointment/>}></Route>
          <Route path="/doctor-list" element={<DoctorList />}></Route>

          {/* Doctor Router */}
          <Route path="/DoctorAppointment" element={<DoctorAppointment/>}></Route>
           <Route path="/DoctorDashboard" element={<DoctorDashboard/>}></Route>
            <Route path="/DoctorProfile" element={<DoctorProfile/>}></Route>

        </Routes>
      </div>
    </div>
    ) : (
     <>
       <Login/>
      <ToastContainer/>
     </>
  )
};

export default App;