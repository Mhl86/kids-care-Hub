import Notes from "../models/Notes.js";

export const addNote = async (req, res) => {
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
