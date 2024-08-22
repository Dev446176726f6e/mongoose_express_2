const { Schema, model } = require("mongoose");

const BookScheme = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
  },
  type_id: {
    type: String,
    enum: {
      values: [
        "Fiction",
        "Non-Fiction",
        "Science Fiction",
        "Fantasy",
        "Mystery",
        "Biography",
        "Historical",
        "Romance",
        "Self-Help",
        "Cookbook",
      ],
      message: "Invalid book genre",
    },
    required: [true, "Book genre is required"],
  },
  pages: {
    type: Number,
    min: [1, "There shoul be at least 1 page."],
  },
  price: {
    type: Number,
    required: function () {
      return this.pages;
    },
  },
  publisher_id: {
    type: Number,
    alias: "matbuoat_id",
  },
  publish_date: {
    type: Date,
    match: [
      /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
      "Please enter right date format.!",
    ],
  },
});

module.exports = model("Book", BookScheme);
