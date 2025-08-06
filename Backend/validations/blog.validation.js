const {body} = require("express-validator")

module.exports.CreateBlogValidation = [
  body("title", "Title is required").notEmpty(),

  body("content", "Content is required").notEmpty(),

  body("tags").optional().isArray().withMessage("Tags must be an array of strings"),

  body("tags.*").optional().isString().withMessage("Each tag must be a string"),
];
