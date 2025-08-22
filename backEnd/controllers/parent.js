import Parent from "../models/Parents.js";

const getAllParents = async (req, res) => {
  try {
    const parents = await Parent.findAll();
    res.json(parents);
  } catch (error) {
    console.error("Error fetching parents:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createParent = async (req, res) => {
  try {
    const parent = await Parent.create(req.body);
    res.status(201).json(parent);
  } catch (error) {
    console.error("Error creating parent:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getParentById = async (req, res) => {
  try {
    const parent = await Parent.findByPk(req.params.id);
    if (!parent) {
      return res.status(404).json({ error: "Parent not found" });
    }
    res.json(parent);
  } catch (error) {
    console.error("Error fetching parent:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const updateParent = async (req, res) => {
  try {
    const [updated] = await Parent.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated) {
      return res.status(404).json({ error: "Parent not found" });
    }
    const updatedParent = await Parent.findByPk(req.params.id);
    res.json(updatedParent);
  } catch (error) {
    console.error("Error updating parent:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const deleteParent = async (req, res) => {
  try {
    const deleted = await Parent.destroy({
      where: { id: req.params.id },
    });
    if (!deleted) {
      return res.status(404).json({ error: "Parent not found" });
    }
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting parent:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export {
  getAllParents,
  createParent,
  getParentById,
  updateParent,
  deleteParent,
};
