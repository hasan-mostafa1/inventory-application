const author = require("../db/queries/author");
const { body, validationResult, matchedData } = require("express-validator");

const validateAuthor = [
  body("fullName")
    .exists()
    .withMessage("fullName is required!")
    .trim()
    .notEmpty()
    .withMessage("fullName can't be empty!")
    .isString()
    .withMessage("fullName must be a string!"),
  body("gender")
    .exists()
    .withMessage("gender is required!")
    .trim()
    .notEmpty()
    .withMessage("gender can't be empty!")
    .isIn(["male", "female", "other"])
    .withMessage("gender must be male, female or other."),
  body("bio").isString().withMessage("bio must be a string!"),
  body("nationality")
    .exists()
    .withMessage("nationality is required!")
    .trim()
    .notEmpty()
    .withMessage("nationality can't be empty!")
    .isString()
    .withMessage("nationality must be a string!"),
  body("birthDate")
    .exists()
    .withMessage("birthDate is required!")
    .trim()
    .notEmpty()
    .withMessage("birthDate can't be empty!")
    .isDate()
    .withMessage("Invalid birthDate"),
];

exports.index = async (req, res) => {
  const authors = await author.all();
  res.render("author/index", { authors: authors });
};

exports.create = (req, res) => {
  res.render("author/create");
};

exports.store = [
  validateAuthor,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .render("author/create", { errors: errors.array() });
    }
    const { fullName, gender, bio, nationality, birthDate } = matchedData(req);
    await author.create(fullName, gender, bio ?? null, nationality, birthDate);

    res.redirect("/authors");
  },
];

exports.show = async (req, res) => {
  const rows = await author.find(req.params.id);
  res.render("author/show", { author: rows[0] });
};

exports.edit = async (req, res) => {
  const rows = await author.find(req.params.id);
  res.render("author/edit", { author: rows[0] });
};

exports.update = [
  validateAuthor,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const rows = await author.find(req.params.id);
      return res
        .status(400)
        .render("author/edit", { author: rows[0], errors: errors.array() });
    }
    const { fullName, gender, bio, nationality, birthDate } = matchedData(req);
    await author.update(
      req.params.id,
      fullName,
      gender,
      bio ?? null,
      nationality,
      birthDate,
    );

    res.redirect("/authors");
  },
];

exports.delete = async (req, res) => {
  await author.delete(req.params.id);
  res.redirect("/authors");
};
