import Caregiver from "../models/Caregiver.js";
const getAllCaregivers = async (req, res) => {
  try {
    const caregiver = await Caregiver.findAll();
    res.json(caregiver);
  } catch (error) {
    console.error("Error fetching caregivers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const createCaregiver = async (req, res) => {
  try {
    const caregiver = await Caregiver.create(req.body);
    res.status(201).json(caregiver);
  } catch (error) {
    console.error("Error creating caregiver:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const getCaregiverById = async (req, res) => {
  try {
    const caregiver = await Caregiver.findByPk(req.params.id);
    if (!caregiver) {
      return res.status(404).json({ error: "Caregiver not found" });
    }
    res.json(caregiver);
  } catch (error) {
    console.error("Error fetching caregiver:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const updateCaregiver = async (req, res) => {
  try {
    const [updated] = await Caregiver.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated) {
      return res.status(404).json({ error: "Caregiver not found" });
    }
    const updatedCaregiver = await Caregiver.findByPk(req.params.id);
    res.json(updatedCaregiver);
  } catch (error) {
    console.error("Error updating caregiver:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const deleteCaregiver = async (req, res) => {
  try {
    const deleted = await Caregiver.destroy({
      where: { id: req.params.id },
    });
    if (!deleted) {
      return res.status(404).json({ error: "Caregiver not found" });
    }
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting caregiver:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export {
  getAllCaregivers,
  createCaregiver,
  getCaregiverById,
  updateCaregiver,
  deleteCaregiver,
};
