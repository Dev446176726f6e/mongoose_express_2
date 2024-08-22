const express = require("express");
const BookRouter = require("./book.routes");

const router = express.Router();

router.use("/book", BookRouter);

module.exports = router