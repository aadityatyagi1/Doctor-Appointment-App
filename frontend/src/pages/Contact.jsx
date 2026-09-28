import React from "react";
import { assets } from "../assets_frontend/assets.js";
const Contact=()=>{
    return(
        <div>
            <div className="text-center text-2xl pt-10 text-gray-500">
                <p>Contact <span className="text-gray-700 font-semibold">US</span> </p>
            </div>
            <div className="my-10  flex flex-col md:flex-row gap-12 items-center md:items-strech">
                <img className="w-[220px] h-[260px] md:w-[280px] md:h-[320px] object-cover rounded-lg" src={assets.contact_image} alt=""/>

                <div className="flex flex-col justify-center gap-3 text-gray-600 text-sm">

    <p className="text-xl font-medium text-gray-800">
        Our Office
    </p>

    <p>
        Greater Noida <b className="text-gray-800">Beta-1</b>
    </p>

    <p>
        Mob. 1111111111
        <b className="text-gray-800 ml-4">
            Email: aaditya991741@gmail.com
        </b>
    </p>

    <p className="text-lg font-medium text-gray-800 mt-4">
        Careers at PRESCRIPTO
    </p>

    <p>
        Learn more about our teams and job openings.
    </p>

    <button className="bg-blue-600 text-white px-6 py-2 rounded-full w-fit mt-2 hover:bg-black hover:text-white transition-all-500">
        Explore Jobs
    </button>

</div>
            </div>
        </div>
    );
};

export default Contact;