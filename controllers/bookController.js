const book = require("../db/queries/book");
const author = require("../db/queries/author");
const { body, validationResult, matchedData } = require("express-validator");

const validateBook = [
  body("title")
    .exists()
    .withMessage("title is required!")
    .trim()
    .notEmpty()
    .withMessage("title can't be empty!")
    .isString()
    .withMessage("title must be a string!"),
  body("shortDescription")
    .exists()
    .withMessage("shortDescription is required!")
    .trim()
    .notEmpty()
    .withMessage("shortDescription can't be empty!")
    .isString()
    .withMessage("shortDescription must be a string!"),
  body("longDescription")
    .exists()
    .withMessage("longDescription is required!")
    .trim()
    .notEmpty()
    .withMessage("longDescription can't be empty!")
    .isString()
    .withMessage("longDescription must be a string!"),
  body("publicationDate")
    .exists()
    .withMessage("publicationDate is required!")
    .trim()
    .notEmpty()
    .withMessage("publicationDate can't be empty!")
    .isDate()
    .withMessage("Invalid publicationDate"),
  body("authorIds")
    .exists()
    .withMessage("author is required!")
    .trim()
    .notEmpty()
    .withMessage("author can't be empty!")
    .isArray()
    .withMessage("authorIds must be an array!"),
];

exports.index = async (req, res) => {
  const books = await book.all();
  res.render("book/index", { books: books });
};

exports.create = async (req, res) => {
  const authors = await author.all();
  res.render("book/create", { authors: authors });
};

exports.store = [
  validateBook,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("book/create", { errors: errors.array() });
    }
    const {
      title,
      shortDescription,
      longDescription,
      publicationDate,
      authorIds,
    } = matchedData(req);

    const newBook = await book.create(
      title,
      shortDescription,
      longDescription,
      publicationDate,
    );
    book.attach(newBook.id, authorIds);
    res.redirect("/books");
  },
];

exports.show = async (req, res) => {
  const rows = await book.findWithAuthors(req.params.id);
  res.render("book/show", { book: rows[0] });
};

exports.edit = async (req, res) => {
  const rows = await book.findWithAuthors(req.params.id);
  const authors = await author.all();
  res.render("book/edit", { book: rows[0], authors: authors });
};

exports.update = [
  validateBook,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const rows = await book.find(req.params.id);
      return res
        .status(400)
        .render("book/edit", { book: rows[0], errors: errors.array() });
    }
    const {
      title,
      shortDescription,
      longDescription,
      publicationDate,
      authorIds,
    } = matchedData(req);
    await book.update(
      req.params.id,
      title,
      shortDescription,
      longDescription,
      publicationDate,
    );
    book.sync(req.params.id, authorIds);
    res.redirect("/books");
  },
];

exports.delete = async (req, res) => {
  await book.delete(req.params.id);
  res.redirect("/books");
};
