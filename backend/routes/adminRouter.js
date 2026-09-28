import express from "express";
import {addDoctor,loginAdmin,allDoctors,appointmentAdmin,adminAppointmentCancel,dataForDashboard} from '../controller/adminController.js';
import upload from "../middlewares/multer.js";
import authAdmin from "../middlewares/authAdmin.js";
import {changeAvailablity} from '../controller/doctorController.js';

const adminRouter=express.Router();


adminRouter.post("/add-doctor",authAdmin,upload.single('image'),addDoctor);
adminRouter.post("/login",loginAdmin);
adminRouter.post("/all-doctors",authAdmin,allDoctors);
adminRouter.post("/change-availability",authAdmin,changeAvailablity);

adminRouter.get("/appointmentAdmin",authAdmin,appointmentAdmin);
adminRouter.post("/adminAppointmentCancel",authAdmin,adminAppointmentCancel);
adminRouter.get("/dashboardData",authAdmin,dataForDashboard);

export default adminRouter;