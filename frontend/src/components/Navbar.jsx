import {React,useState,useContext} from "react";
import { assets } from "../assets_frontend/assets.js";
import {NavLink,useNavigate} from "react-router-dom";
import {AppContext} from "../context/AppContext";

const Navbar=()=>{

    const navigate=useNavigate();

    let {token,setToken,userData}=useContext(AppContext);

    const [showMenu,setShowMenu]=useState(false);
    
    const logout=()=>{
      setToken(false);
      localStorage.removeItem("token");
    };
    return(
        <div className="flex items-center justify-between text-sm py-4 mb-5 border-b-gray-400">
            <img onClick={()=>navigate("/")} className="w-44 cursor-pointer" src={assets.logo} alt="Logo"></img>
            <ul className="hidden md:flex items-start gap-5 font-medium">
                <NavLink to="/" className="py-1">
                    <li>Home</li>
                    <hr className="border-none outline-none h-0.5 bg-primary w-3 m-auto hidden"/>
                </NavLink>
                <NavLink to="/doctor" className="py-1">
                    <li>All Doctor</li>
                    <hr className="border-none outline-none h-0.5 bg-primary w-3 m-auto hidden"/>
                </NavLink>
                <NavLink to="/about" className="py-1">
                    <li>About</li>
                    <hr className="border-none outline-none h-0.5 bg-primary w-3 m-auto hidden"/>
                </NavLink>
                <NavLink to="/contact" className="py-1">
                    <li>Contact</li>
                    <hr className="border-none outline-none h-0.5 bg-primary w-3 m-auto hidden"/>
                </NavLink>
                
            </ul>
            <div className="flex item-center gap-4">
                {
                    token && userData ?
                    <div className="flex item-center gap-2 cursor-pointer group relative">
                        <img className="w-8 rounded-full" src={userData.image} alt=""/>
                        <img className="w-2.5 " src={assets.dropdown_icon} alt=""/>
                        <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
                            <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                                <p onClick={()=>navigate("/myprofile")} className="hover:text-black cursor-pointer">My Profile</p>
                                <p onClick={()=>navigate("/myappointment")} className="hover:text-black cursor-pointer">My Appointment</p>
                                <p onClick={()=>logout()} className="hover:text-black cursore-pointer">Logout</p>

                            </div>
                        </div>

                    </div>
                    : <button onClick={()=>navigate("/login")}  className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block">Create Account</button>
                }

                <img onClick={()=>setShowMenu(true)} className="w-6 md:hidden" src={assets.menu_icon}/>
                  
                  {/* -----------------Mobile Menu------------------ */}

                  <div
                className={`${
                showMenu ? "fixed w-full" : "h-0 w-0"
                } md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all duration-300`}
>
  
  {/* Header */}
  <div className="flex items-center justify-between px-5 py-5 border-b">

    <img
      className="w-32"
      src={assets.logo}
      alt="Logo"
    />

    <img
      onClick={() => setShowMenu(false)}
      className="w-6 cursor-pointer"
      src={assets.cross_icon}
      alt="Close"
    />

  </div>

  {/* Navigation */}
  <ul className="flex flex-col gap-2 px-5 py-6">

    <NavLink
      to="/"
      
      onClick={() => setShowMenu(false)}><p className="px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100">Home</p></NavLink>

    <NavLink
      to="/doctor"
     
      onClick={() => setShowMenu(false)}><p className="px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100">All Doctors</p></NavLink>

    <NavLink
      to="/about"
     
      onClick={() => setShowMenu(false)}><p  className="px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100">About</p> </NavLink>

    <NavLink
      to="/contact"
      
      onClick={() => setShowMenu(false)}><p className="px-4 py-3 rounded-lg text-bgray-700 hover:bg-gray-100">Contact</p></NavLink>

  </ul>
</div>
                
            </div>

            
        </div>
        
    );
};


export default Navbar;