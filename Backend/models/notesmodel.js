const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: { type: [String], default: [] },
  user_id: { type: String, required: true },
  ispinned: { type: Boolean, default: false },
  createdon: { type: Date, default: Date.now },
});

const notes = mongoose.model("notes", notesSchema);

module.exports = {
  notes,
};
