const express = require("express");
const router = express.Router();
const {
  makeNotes,
  getNotes,
  updateNotes,
  deleteNotes,
} = require('../controllers/noteControllers');

const requireAuth = require('../middleware/requireAuth');

// Protect all note routes
router.use(requireAuth);

router.post("/createNote", makeNotes);
router.get("/getAllNotes", getNotes);
router.put("/updateNote/:id", updateNotes);
router.delete("/deleteNote/:id", deleteNotes);

module.exports = router;
