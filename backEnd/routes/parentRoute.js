import { Router } from "express";
import {
  getAllParents,
  createParent,
  getParentById,
  updateParent,
  deleteParent,
} from "../controllers/parent.js";
const parentRouter = Router();
parentRouter.route("/").get(getAllParents).post(createParent);

parentRouter
  .route("/:id")
  .get(getParentById)
  .put(updateParent)
  .delete(deleteParent);

export default parentRouter;
