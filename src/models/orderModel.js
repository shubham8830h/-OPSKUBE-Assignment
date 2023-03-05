const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const orderSchema = new mongoose.Schema({
  bookId: {
    type: ObjectId,
  },
  customerId: {
    type: ObjectId,
  },
  price: {
    type: Number,
  },
  orderDate: {
    type: Date,
  },
},{timestamps:true});

module.exports = mongoose.model("order", orderSchema);
