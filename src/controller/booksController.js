const bookModel = require("../models/booksModel");
const sellerModel = require("../models/sellerModel");

//create book by id
let createBook = async function (req, res) {
  try {
    const body = req.body;
    const book = await bookModel.create(body);

    if (book) {
      res.status(201);
      res.json(book);
    } else {
      throw new Error("Book creating failed");
    }
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};

//fetch all books
let getBooks = async function (req, res) {
  try {
    const books = await bookModel.find().populate("sellerId").sort("createdAt");
    if (books) {
      res.status(200);
      res.send(books);
    } else {
      res.status(401);
      throw new Error("Server error");
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

//fetch books by id
let getBookById = async function (req, res) {
  try {
    const data = req.params;
    const books = await bookModel
      .findOne({ _id: data.id })
      .populate("sellerId");
   
    if (books) {
      res.status(200);
      res.send(books);
    } else {
      res.status(401);
      throw new Error("Server error");
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

//update book by id
let updateBooks = async function (req, res) {
  try {
    const data = req.params.id;
    const body = req.body;
    const book = await bookModel.findByIdAndUpdate(
      { data },
      { body },
      { new: true }
    );
    res.status(200);
    res.send(book);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

// delete book by id
let deleteBook = async function (req, res) {
  try {
    const data=req.params
    const book = await bookModel.findByIdAndDelete(data.id);
    res.status(200);
    res.send(book);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = { createBook, getBooks, getBookById, updateBooks, deleteBook };
