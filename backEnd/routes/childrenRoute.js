import { Router } from "express";
import {
  getAllChildren,
  getChildrenById,
  createChildren,
  updateChildren,
  deleteChildren,
  getChildDetails,
  addNote,
  assignCaregiver,
  addActivity, // <- import from children controller
} from "../controllers/children.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const childrenRouter = Router();

// Specific routes first
childrenRouter.get("/:id/details", verifyToken, getChildDetails);
childrenRouter.post("/:id/notes", verifyToken, addNote);
childrenRouter.post("/:id/assign", verifyToken, assignCaregiver);
childrenRouter.post("/:id/activities", verifyToken, addActivity); // <- new route

// General CRUD routes
childrenRouter
  .route("/")
  .get(verifyToken, getAllChildren)
  .post(verifyToken, createChildren);

childrenRouter
  .route("/:id")
  .get(verifyToken, getChildrenById)
  .put(verifyToken, updateChildren)
  .delete(verifyToken, deleteChildren);

export default childrenRouter;
