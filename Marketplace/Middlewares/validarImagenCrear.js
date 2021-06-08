const path = require("path");
const { body } = require("express-validator");

module.exports = [
	body("imagen").custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = [".jpg", ".png", ".gif", ".bmp"];
		if (!file) {
			throw new Error("Tenés que subir una imagen");
		} else {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(
					`Las extensiones de archivo permitidas son ${acceptedExtensions.join(", ")}`
				);
			}
		}
		return true;
	}),
];
