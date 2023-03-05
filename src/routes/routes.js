const express = require("express");
const router = express.Router();
const booksController = require("../controller/booksController");
const sellerController = require("../controller/sellerController");

//seller 
router.post("/register", sellerController.postSeller);
router.get("/seller", sellerController.getSeller);
router.post("/login",sellerController.loginUser)

//books 
router.post("/book/create", booksController.createBook)
router.get("/book/get", booksController.getBooks);
router.get("/book/:id", booksController.getBookById);
router.put("/book/:id", booksController.updateBooks);
router.delete("/book/delete/:id", booksController.deleteBook);

module.exports = router;
