const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  status: {
    type: String,
    required: true,
  },
  total: {
    type: String,
    required: true,
  },
  items: [
    {
      item_ID: {
        type: Schema.Types.ObjectId,
        ref: "Item",
      },
      quantity: {
        type: Number,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      price: {
        type: String,
        required: true,
      },
      total: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Order", orderSchema);
