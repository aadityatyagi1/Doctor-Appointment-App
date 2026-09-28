import React from "react";
import { assets } from "../assets_frontend/assets.js";
const Footer=()=>{
    return(
        <div className="md:mx-10">
            <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
                 {/* -------------------------leftSide------------------------------- */}
             <div>
                <img className="mb-5 w-40" src={assets.logo}/>
                <p className="w-full md:w-2/3 text-gray-600 leading-6">Book trusted doctors easily and manage your healthcare appointments in one place. Our platform helps you find experienced medical professionals, choose convenient appointment times, and access quality healthcare with ease. We are committed to making healthcare simpler, faster, and more accessible for everyone, whenever you need it.</p>
             </div>

             {/* -------------------------center------------------------------- */}
             <div>
                <p className="text-xl font-medium mb-5">Company</p>
                <ul className="flex flex-col gap-2 text-gray-600">
                    <li>Home</li>
                    <li>About us</li>
                    <li>Contact us</li>
                    <li>Privacy Policy</li>
                </ul>
             </div>


             {/* -------------------------RightSide------------------------------- */}
             <div>
                <p className="text-xl font-medium mb-5">Get In Touch</p>
                <ul className="flex flex-col gap-2 text-gray-600">
                    <li>+9138763948</li>
                    <li>aaditya991741@gmail.com</li>
                </ul>
                
             </div>
            </div>
             
             

        </div>
    );
};

export default Footer;