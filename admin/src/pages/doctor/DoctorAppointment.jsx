import {React,useContext,useEffect} from "react";
import {DoctorContext} from "../../context/DoctorContext";

import{AppContext} from "../../context/AppContext";


const DoctorAppointment=()=>{
    const {allAppointment,dToken,appointment,completeAppointment,appointmentCancel}=useContext(DoctorContext);
    const {calculateAge,slotdateFormate}=useContext(AppContext);

    useEffect(()=>{
        if(dToken){
            allAppointment();

        }
    }
    ,[dToken]);
    return(
        <div className="w-full max-w-6xl m-5">
            <p className="mb-3 text-lg font-medium">All Appointment</p>

            <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll">
                <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b">
                    <p>#</p>
                    <p>Patient</p>
                    <p>Payment</p>
                    <p>Age</p>
                    <p>Date & Time</p>
                    <p>Fees</p>
                    <p>Action</p>
                </div>
                <div className="w-full overflow-x-auto">
    <div className="min-w-[900px]">

        {appointment.slice().reverse().map((item, index) => {
            return (
                <div
                    key={index}
                    className="
                        grid
                        grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1.5fr]
                        gap-2
                        items-center
                        py-4
                        px-6
                        border-b
                        hover:bg-gray-50
                    "
                >
                    {/* # */}
                    <p className="text-gray-600">
                        {index + 1}
                    </p>

                    {/* Patient */}
                    <div className="flex items-center gap-3">
                        <img
                            className="w-10 h-10 rounded-full object-cover"
                            src={item.userData.image}
                            alt=""
                        />

                        <p className="font-medium truncate">
                            {item.userData.name}
                        </p>
                    </div>

                    {/* Payment */}
                    <div>
                        <span
                            className={`
                                px-2 py-1
                                rounded-full
                                text-xs
                                whitespace-nowrap
                                ${
                                    item.payment
                                        ? "bg-green-100 text-green-600"
                                        : "bg-gray-100 text-gray-600"
                                }
                            `}
                        >
                            {item.payment ? "Online" : "Cash"}
                        </span>
                    </div>

                    {/* Age */}
                    <p className="text-gray-600">
                        {calculateAge(item.userData.dob)}
                    </p>

                    {/* Date & Time */}
                    <p className="text-gray-600">
                        {slotdateFormate(item.slotDate)}
                        <br />
                        <span className="text-gray-500">
                            {item.slotTime}
                        </span>
                    </p>

                    {/* Fees */}
                    <p className="font-medium">
                        ₹{item.docData.fees * 100}
                    </p>

                    {/* Action */}
                    <div className="flex flex-col gap-2 items-start">

                        {/* Cancel */}
                        {!item.cancel ? (
                            <button
                                onClick={() =>
                                    appointmentCancel(item._id)
                                }
                                className="
                                    border border-red-400
                                    text-red-500
                                    hover:bg-red-300
                                    rounded-full
                                    px-4 py-1
                                    text-xs
                                    transition-all
                                    whitespace-nowrap
                                "
                            >
                                Cancel
                            </button>
                        ) : (
                            <button
                                disabled
                                className="
                                    px-3 py-1
                                    border border-red-400
                                    rounded-full
                                    bg-red-400
                                    text-white
                                    text-xs
                                    cursor-not-allowed
                                "
                            >
                                Cancelled
                            </button>
                        )}

                        {/* Complete */}
                        {item.isCompleted ? (
                            <span
                                className="
                                    flex items-center gap-1
                                    bg-green-100
                                    text-green-600
                                    border border-green-400
                                    rounded-full
                                    px-3 py-1
                                    text-xs
                                    whitespace-nowrap
                                "
                            >
                                <i className="fa-solid fa-check"></i>
                                Completed
                            </span>
                        ) : (
                            <button
                                onClick={() =>
                                    completeAppointment(item._id)
                                }
                                className="
                                    border border-green-400
                                    text-green-500
                                    hover:bg-green-300
                                    rounded-full
                                    px-4 py-1
                                    text-xs
                                    transition-all
                                    whitespace-nowrap
                                "
                            >
                                Complete
                            </button>
                        )}

                    </div>
                </div>
            );
        })}

    </div>
</div>
            </div>
        </div>
    );
}

export default DoctorAppointment;