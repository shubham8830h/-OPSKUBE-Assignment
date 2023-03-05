const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  auther: {
    type: String,
  },
  price: {
    type: Number,
  },
  sellerId: {
    type: ObjectId,
    ref: "seller",
  },
},{timestamps:true});

module.exports = mongoose.model("book", bookSchema);
