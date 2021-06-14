const { body } = require("express-validator");

module.exports = [
	body("email")
		.notEmpty().withMessage("Tienes que escribir un correo electrónico").bail()
		.isEmail().withMessage("Formato inválido de correo electrónico").bail()
		,
];