import React from "react";
import { assets } from "../assets_frontend/assets.js";
const About=()=>{
    return(
       <div>
    <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
            About <span className="text-gray-700 font-medium">US</span>
        </p>
    </div>

    <div className="my-10 flex flex-col md:flex-row gap-12 items-center md:items-stretch">

        <img
            className="w-[220px] h-[280px] md:w-[200px] md:h-[280px] object-cover rounded-lg"
            src={assets.about_image}
            alt="About us"
        />

        <div className="flex flex-col justify-center gap-5 md:w-2/4 text-sm text-gray-600">
            
            <p>
                Our doctor appointment platform makes it easy to find the right
                doctor and book appointments online. Patients can explore
                doctors by speciality, check their availability, and choose a
                convenient time.
            </p>

            <p>
                We connect patients with trusted healthcare professionals
                through a simple and user-friendly platform. Our goal is to make
                the appointment process quick, easy, and hassle-free.
            </p>

            <b className="text-gray-700">Our Vision</b>

            <p>
                Our vision is to make quality healthcare more accessible by
                connecting patients with the right doctors at the right time.
                We aim to create a simple, reliable, and convenient healthcare
                experience for everyone.
            </p>

        </div>
    </div>
</div>
        
    );
};

export default About;