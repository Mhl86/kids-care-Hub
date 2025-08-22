import Children from "../models/Childrens.js";

const getAllChildren = async (req, res) => {
  try {
    const children = await Children.findAll();
    res.json(children);
  } catch (error) {
    console.error("Error fetching children:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createChildren = async (req, res) => {
  try {
    const children = await Children.create(req.body);
    res.status(201).json(children);
  } catch (error) {
    console.error("Error creating children:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const getChildrenById = async (req, res) => {
  try {
    const children = await Children.findByPk(req.params.id);
    if (!children) {
      return res.status(404).json({ error: "Children not found" });
    }
    res.json(children);
  } catch (error) {
    console.error("Error fetching children:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const updateChildren = async (req, res) => {
  try {
    const [updated] = await Children.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated) {
      return res.status(404).json({ error: "Children not found" });
    }
    const updatedChildren = await Children.findByPk(req.params.id);
    res.json(updatedChildren);
  } catch (error) {
    console.error("Error updating children:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteChildren = async (req, res) => {
  try {
    const deleted = await Children.destroy({
      where: { id: req.params.id },
    });
    if (!deleted) {
      return res.status(404).json({ error: "Children not found" });
    }
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting children:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export {
  getAllChildren,
  createChildren,
  getChildrenById,
  updateChildren,
  deleteChildren,
};
