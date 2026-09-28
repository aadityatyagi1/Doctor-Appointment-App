import React from "react";
import {Routes,Route} from "react-router-dom";
import Home from "./pages/Home";
import Doctor from "./pages/Doctor";
import About from "./pages/About";
import Login from "./pages/Login";
import MyProfile from "./pages/MyProfile";
import MyAppointment from "./pages/MyAppointment";
import Contact from "./pages/Contact";
import Appointment from "./pages/Appointment";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App=()=>{
  return(
    <div className="mx-4 sm:mx-[10%]">
      <ToastContainer/>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/doctor" element={<Doctor/>}></Route>
        <Route path="/doctor/:specility" element={<Doctor/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/myprofile" element={<MyProfile/>}></Route>
        <Route path="/myappointment" element={<MyAppointment/>}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/appointment/:docId" element={<Appointment/>}></Route>
        
      </Routes>
      <Footer/>
      
    </div>
  );
}

export default App;