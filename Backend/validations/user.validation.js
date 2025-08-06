const {body} = require("express-validator")

module.exports.registerValidation = [
  body("name", "Name is required").notEmpty(),
  body("email", "Valid email is required").isEmail(),
  body("password", "Password must be at least 6 characters").isLength({ min: 6 }),
];

module.exports.loginValidation=[
  body("email", "Valid email is required").isEmail(),
  body("password", "Password is required").notEmpty()
]

module.exports.ContactValidation= [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('message').trim().notEmpty().withMessage('Message is required'),
]