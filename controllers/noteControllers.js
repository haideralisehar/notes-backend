const Note = require("../models/taskModel.js");

// Create note
const makeNotes = async (req, res) => {
  try {
    const { title, description } = req.body;

    const newNote = new Note({
      title,
      description,
      userId: req.user._id, // associate note with user
    });

    await newNote.save();

    res.status(200).json({
      success: true,
      message: "Note created successfully",
      note: newNote,
    });

    console.log(`Note created for user ${req.user._id}`);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get only user's notes
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user._id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      notes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch notes",
      details: error.message,
    });
  }
};

// Update note (only if it belongs to user)
const updateNotes = async (req, res) => {
  try {
    const { title, description } = req.body;
    const { id } = req.params;

    const note = await Note.findOne({ _id: id, userId: req.user._id });
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    note.title = title || note.title;
    note.description = description || note.description;
    await note.save();

    res.status(200).json({
      success: true,
      message: "Note updated successfully",
      note,
    });
  } catch (error) {
    res.status(500).json({ error: "Error updating note", details: error.message });
  }
};

// Delete note (only if it belongs to user)
const deleteNotes = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedNote = await Note.findOneAndDelete({ _id: id, userId: req.user._id });

    if (!deletedNote) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
      note: deletedNote,
    });

    console.log(`Note deleted for user ${req.user._id}`);
  } catch (error) {
    res.status(500).json({
      error: "Error deleting note",
      details: error.message,
    });
  }
};

module.exports = { makeNotes, getNotes, updateNotes, deleteNotes };
