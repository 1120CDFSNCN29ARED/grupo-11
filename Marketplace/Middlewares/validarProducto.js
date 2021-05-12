const { body } = require("express-validator");

module.exports = [
	body("nombre")
		.isLength({ min: 2, max: 30 }).withMessage("El nombre debe ser de 2 a 30 caracteres").bail()
		,
	body("precio")
		.isLength({ min: 2, max: 20 }).withMessage("El precio debe ser de 2 a 20 caracteres").bail()
		,
];
