const { body } = require("express-validator");

module.exports = [
	body("nombre")
		.notEmpty().withMessage("Tenés que escribir un nombre").bail()
		.isLength({min: 2}).withMessage("El nombre debe ser más largo").bail()
		.isLength({max: 30}).withMessage("El nombre debe ser más corto").bail()
		,
	body("precio")
		.notEmpty().withMessage("Tenés que escribir un precio").bail()
		.isNumeric().withMessage("Debés introducir solamente números").bail()
		.isLength({ max: 10 }).withMessage("El precio debe ser menor").bail()
		.custom((value, { req }) => {
			let precio = parseFloat(req.body.precio);
			if (precio < 100) {
				throw new Error("El precio debe ser mayor");
			}
			return true;
		})
		,
];
