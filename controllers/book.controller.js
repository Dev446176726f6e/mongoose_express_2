const Book = require("../schemas/Book");
const mongoose = require("mongoose");
const { errorHandler } = require("../helpers/error_handler");

const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    if (books.length == 0) {
      return res.status(200).send({ message: "The collection is empty.!" });
    }
    res.status(200).send(books);
  } catch (error) {
    errorHandler(res, error);
  }
};

const addBook = async (req, res) => {
  try {
    const { title, author, type_id, pages, price, matbuoat_id, publish_date } =
      req.body;
    const newBook = await Book({
      title,
      author,
      type_id,
      pages,
      price,
      matbuoat_id,
      publish_date,
    });
    // await newBook.validate();
    await newBook.save();
    console.log(newBook);
    res.status(201).send({ message: "New book created", newBook });
  } catch (error) {
    console.log(error);
  }
};

const deleteBook = async (req, res) => {
  try {
    const bookID = req.params.id;

    if (!mongoose.isValidObjectId(bookID)) {
      return res.status(400).send({ error: "Invalid ObjectID" });
    }
    // const result1 = await Book.deleteOne({ _id: bookID });

    // if (result.deleteCount === 0) {
    //   return res.status(404).send({ message: "Book not found.!" });
    // }
    const deletedBook = await Book.findByIdAndDelete(bookID);
    console.log(deletedBook);
    if (!deletedBook) {
      return res.status(404).send({ message: "Book not found" });
    }

    res.status(200).send({ message: "Book deleted successfully!" });
  } catch (error) {
    errorHandler(res, error);
  }
};

const updateBook = async (req, res) => {
  try {
    const bookID = req.params.id;
    const { title, author, type_id, pages, price, matbuoat_id, publish_date } =
      req.body;
    if (!mongoose.isValidObjectId(bookID)) {
      return res.status(400).send({ error: "Book not found.!" });
    }
    const updatedBook = await Book.findByIdAndUpdate(bookID, {
      title,
      author,
      type_id,
      pages,
      price,
      matbuoat_id,
      publish_date,
    });
    console.log(updatedBook);
    if (!updatedBook) {
      return res.status(400).send({ error: "Book is not updated.!" });
    }
    res.status(200).send({ message: "Book is updated.!" });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getBookByID = async (req, res) => {
  try {
    const bookID = req.params.id;
    if (!mongoose.isValidObjectId(bookID)) {
      return res.status(400).send({ error: "Invalid ObjectID" });
    }
    const result = await Book.findById(bookID);
    if (!result) {
      return res.status(404).send({ message: "Book not found" });
    }
    res.status(200).send(result);
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  getBooks,
  addBook,
  deleteBook,
  getBookByID,
  updateBook,
};
