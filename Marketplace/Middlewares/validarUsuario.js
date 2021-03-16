const path = require('path');
const {body} = require('express-validator');
const { localsName } = require('ejs');

module.exports = [
	body('nombre')
		.notEmpty().withMessage('Tienes que escribir un nombre').bail()
		.isLength({min:2, max:20}).withMessage("Debe tener entre 2 y 20 letras")
		,
	body('apellido')
		.notEmpty().withMessage('Tienes que escribir un apellido')
		.isLength({min:2, max:20}).withMessage("Debe tener entre 2 y 20 letras")
		,
	body('email')
		.notEmpty().withMessage('Tienes que escribir un correo electrónico').bail()
		.isEmail().withMessage('Debes escribir un formato de correo válido').bail()
		,
	body('contrasena')
		.notEmpty().withMessage('Tienes que escribir una contraseña').bail()
		.isLength({min:6, max:12}).withMessage("Debe tener entre 6 y 12 caracteres")
		,
	body('contrasena2')
		.notEmpty().withMessage('Tienes que escribir una contraseña').bail()
		,
	body('imagen').custom((value, {req}) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.png', '.gif'];
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