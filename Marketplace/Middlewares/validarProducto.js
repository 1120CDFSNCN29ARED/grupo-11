const { body } = require("express-validator");

module.exports = [
	body("nombre")
		.isLength({ min: 2, max: 30 }).withMessage("El nombre debe ser de 2 a 30 caracteres").bail()
		,
	body("precio")
		.notEmpty().withMessage("Tenés que escribir un precio").bail()
		.isLength({ max: 10 }).withMessage("El precio debe ser más corto").bail()
		.isNumeric().withMessage("Debés introducir solamente números").bail()
		.custom((value, { req }) => {
			let precio = parseFloat(SanitizePrice(req.body.precio));
			if (precio < 100) {
				throw new Error("El precio debe ser mayor");
			}
			return true;
		})
		,
];

function SanitizePrice(priceString) {
	return priceString
		.replace(".", "")
		.replace(",", ".")
		.replace("$", "")
		.replace(" ", "");
}