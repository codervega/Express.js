const { Schema, model } = require("mongoose");

let noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    desc: {
      type: String,
      required: true
    },
    author: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = model('note', noteSchema);
