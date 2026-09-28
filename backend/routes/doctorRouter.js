import express from "express";
const doctorRouter=express.Router();
import {getDoctorData,doctorLogin,allDoctorAppointment,completeAppointment,doctorCancelAppointment,doctorDashBoard,getDoctorProfile,editDoctorProfile} from "../controller/doctorController.js";
import authDoctor from "../middlewares/authDoctor.js";

doctorRouter.get("/list",getDoctorData);
doctorRouter.post("/login",doctorLogin);
doctorRouter.get("/allDoctorAppointment",authDoctor,allDoctorAppointment);

doctorRouter.post("/completeAppointment",authDoctor,completeAppointment);

doctorRouter.post("/doctorCancelAppointment",authDoctor,doctorCancelAppointment);

doctorRouter.get("/getDashboardData",authDoctor,doctorDashBoard);
doctorRouter.get("/getProfile",authDoctor,getDoctorProfile);


doctorRouter.post("/editProfile",authDoctor,editDoctorProfile);








export default doctorRouter;