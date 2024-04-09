import express from "express";
import {
  AddAppointMentCollection,
  AppointmentPatientsList,
  appointMentByDate,
  DoctorList,
  IsDoctor,
  AddServices,
  ServicesList,
  AddReview,
  ReviewsList,
  UpdateUserInfo,
  InsertNewPatient,
  GetPatients
} from "../controllers/doctor.js";
import {
  login,
  register,
  therapistsList,
  viewUser,
  getTherapist
} from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();
router.get("/checkauthentication", verifyToken, (req, res, next) => {
  res.send("working token ");
});

router.post("/auth/addAppointMent", verifyToken, AddAppointMentCollection);
router.post("/auth/appointByDate", verifyToken, verifyUser, appointMentByDate);
router.post("/auth/addReview", verifyToken, AddReview);
router.put("/auth/updateInfo/:id", verifyToken, UpdateUserInfo);
router.get("/auth/patients", verifyToken, verifyUser, AppointmentPatientsList);
router.get("/auth/users", verifyToken, verifyAdmin, viewUser);
router.put("/auth/client/:username", InsertNewPatient);
router.get("/therapist/patients/:id", GetPatients);

//global

router.post("/auth/isDoctor", IsDoctor);
router.get("/auth/reviews", ReviewsList);
router.get("/auth/doctors", DoctorList);
router.get("/auth/therapists", therapistsList);
router.get("/auth/therapist/:username", getTherapist);

//auth
router.post("/auth/register", register);
router.post("/auth/login", login);
export default router;
