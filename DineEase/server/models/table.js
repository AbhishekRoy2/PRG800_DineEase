const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tableSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Table", tableSchema);
