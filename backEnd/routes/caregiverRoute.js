import { Router } from "express";
import {
  getAllCaregivers,
  getCaregiverById,
  createCaregiver,
  updateCaregiver,
  deleteCaregiver,
} from "../controllers/caregiver.js";
const caregiverRouter = Router();
caregiverRouter.route("/").get(getAllCaregivers).post(createCaregiver);
caregiverRouter
  .route("/:id")
  .get(getCaregiverById)
  .put(updateCaregiver)
  .delete(deleteCaregiver);
export default caregiverRouter;
