const path = require('path');
const {body} = require('express-validator');
const { localsName } = require('ejs');

module.exports = [
	body('nombre')
		.notEmpty().withMessage('Tienes que escribir un nombre').bail()
		.isAlpha("es-ES").withMessage('Sólo se admiten letras del abecedario castellano').bail()
		.isLength({min:2, max:20}).withMessage("El nombre debe ser de 2 a 20 letras").bail()
		,
	body('apellido')
		.notEmpty().withMessage('Tienes que escribir un apellido').bail()
		.isLength({min:2, max:20}).withMessage("El apellido debe ser de 2 a 20 letras").bail()
		,
	body('email')
		.notEmpty().withMessage('Tienes que escribir un correo electrónico').bail()
		.isEmail().withMessage('Debes escribir un formato de correo válido').bail()
		,
	body('contrasena')
		.notEmpty().withMessage('Tienes que escribir una contraseña').bail()
		.isLength({min:6, max:12}).withMessage("La contraseña debe tener de 6 a 12 caracteres").bail()
		,
	body('contrasena2')
		.notEmpty().withMessage('Tienes que escribir una contraseña').bail()
		.isLength({min:6, max:12}).withMessage("La contraseña debe tener de 6 a 12 caracteres").bail()
		,
	body('imagen').custom((value, {req}) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.png', '.gif', '.bmp'];
		if (!file) {
			throw new Error('Tienes que subir una imagen');
		} else {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
			}
		}
		return true;
	}),
]