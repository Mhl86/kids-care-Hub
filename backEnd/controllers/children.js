import Children from "../models/Childrens.js";
import Notes from "../models/Notes.js";
import Parent from "../models/Parent.js";
import Caregiver from "../models/Caregiver.js";
import Activity from "../models/Activity.js";

// Get all children for logged-in parent
const getAllChildren = async (req, res) => {
  try {
    const parentId = req.user.id;

    const children = await Children.findAll({
      where: { Parent_Id: parentId },
    });

    res.json(children);
  } catch (error) {
    console.error("Error fetching children:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create child (only parent)
const createChildren = async (req, res) => {
  try {
    const parentId = req.user.id;

    const child = await Children.create({
      ...req.body,
      Parent_Id: parentId,
      Caregiver_Id: null, // no caregiver at first
    });

    res.status(201).json(child);
  } catch (error) {
    console.error("Error creating child:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get child by ID
const getChildrenById = async (req, res) => {
  try {
    const child = await Children.findByPk(req.params.id);
    if (!child) return res.status(404).json({ error: "Child not found" });

    res.json(child);
  } catch (error) {
    console.error("Error fetching child:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update child
const updateChildren = async (req, res) => {
  try {
    const [updated] = await Children.update(req.body, {
      where: { id: req.params.id },
    });

    if (!updated) return res.status(404).json({ error: "Child not found" });

    const updatedChild = await Children.findByPk(req.params.id);
    res.json(updatedChild);
  } catch (error) {
    console.error("Error updating child:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete child
const deleteChildren = async (req, res) => {
  try {
    const deleted = await Children.destroy({
      where: { id: req.params.id },
    });

    if (!deleted) return res.status(404).json({ error: "Child not found" });

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting child:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get child details with parent, caregiver, notes & activities
const getChildDetails = async (req, res) => {
  try {
    const child = await Children.findByPk(req.params.id, {
      include: [
        { model: Parent, attributes: ["firstName", "lastName"] },
        { model: Caregiver, attributes: ["firstName", "lastName"] },
        {
          model: Notes,
          as: "Notes",
          attributes: ["id", "content", "authorType", "authorId"],
        },
        {
          model: Activity,
          as: "Activities",
          attributes: ["id", "activity", "authorType", "createdAt"],
        },
      ],
    });

    if (!child) return res.status(404).json({ message: "Child not found" });

    res.json(child);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching child details",
      error: err.message,
    });
  }
};

// Add a note
const addNote = async (req, res) => {
  try {
    const childId = req.params.id;
    const parentId = req.user.id;
    const { content } = req.body;

    const note = await Notes.create({
      content,
      childId,
      authorType: "parent",
      authorId: parentId,
    });

    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ message: "Error adding note", error: err.message });
  }
};

// Assign caregiver to child
const assignCaregiver = async (req, res) => {
  try {
    const caregiverId = req.user.id; // logged-in caregiver
    const childId = req.params.id;

    const child = await Children.findByPk(childId);
    if (!child) return res.status(404).json({ message: "Child not found" });

    child.Caregiver_Id = caregiverId;
    await child.save();

    res.json({ message: "Child assigned successfully", child });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error assigning child", error: err.message });
  }
};

// Add activity (caregiver or parent can add)
const addActivity = async (req, res) => {
  try {
    const childId = req.params.id;
    const { activity, authorType } = req.body;

    if (!activity || !authorType) {
      return res
        .status(400)
        .json({ message: "Activity and authorType required" });
    }

    const newActivity = await Activity.create({
      activity,
      authorType,
      childId,
    });

    res.status(201).json(newActivity);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error adding activity", error: err.message });
  }
};

export {
  getAllChildren,
  createChildren,
  getChildrenById,
  updateChildren,
  deleteChildren,
  getChildDetails,
  addNote,
  assignCaregiver,
  addActivity,
};
