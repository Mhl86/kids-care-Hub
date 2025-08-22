import { Router } from "express";
import {
  getAllChildren,
  getChildrenById,
  createChildren,
  updateChildren,
  deleteChildren,
} from "../controllers/children.js";
const childrenRouter = Router();
childrenRouter.route("/").get(getAllChildren).post(createChildren);
childrenRouter
  .route("/:id")
  .get(getChildrenById)
  .put(updateChildren)
  .delete(deleteChildren);
export default childrenRouter;
