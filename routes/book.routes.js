const express = require("express");
const {
  getBooks,
  addBook,
  deleteBook,
  getBookByID,
  updateBook,
} = require("../controllers/book.controller");

const router = express.Router();

router.get("/", getBooks);
router.get("/:id", getBookByID);
router.delete("/delete/:id", deleteBook);
router.post("/create", addBook);
router.put("/update/:id", updateBook);

module.exports = router;
