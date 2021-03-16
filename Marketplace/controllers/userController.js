// Requires ***********************************
const fs = require('fs');
let path = require('path')
const bcryptjs = require('bcryptjs')
const {validationResult} = require('express-validator');

// Arhivos y Paths ****************************
const usersFilePath = path.join(__dirname, '../database/usuarios.json');
const imagesPath = path.join(__dirname, "../public/images/users/");

// Controlador ********************************
const controller = {

	crearForm: (req, res) => {
		let titulo = "Registro"
		res.render('usuario-crear', {titulo});
	},

	crearGuardar:(req, res) => {
		const resultValidation = validationResult(req);
		if (resultValidation.errors.length > 0) {
			return res.render('usuario-crear', {
				errors: resultValidation.mapped(),
				oldData: req.body,
				titulo: "Registro"
			});
		}

		const usuarios = GetFileObject(usersFilePath);
		const nuevoId = usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1;
		const nuevoUsuario = {
			id: nuevoId,
			...req.body,
			contrasena: bcryptjs.hashSync(req.body.contrasena, 10),
			imagen: req.file.filename,
		};
		delete nuevoUsuario.contrasena2
		usuarios.push(nuevoUsuario);
		WriteFile(usersFilePath, usuarios);
		res.redirect('/usuario/'+ nuevoId +"/detalle");
	},

	detalle: (req, res) => {
		let titulo = "Detalle del Usuario"
		const users = GetFileObject(usersFilePath);
		let usuario = users.find(usuario => usuario.id == req.params.id);		
		res.render('usuario-detalle', {usuario, titulo});
	},

	editarForm: (req, res) => {
		let titulo = "Editar el Usuario"
		const users = GetFileObject(usersFilePath);
		let usuario = users.find(usuario => usuario.id == req.params.id);
		res.render('usuario-editar', {usuario, titulo});
	},

	editarGuardar: (req, res) => {
		const usuarios = GetFileObject(usersFilePath);
		const ID = req.params.id;
		let usuario = usuarios.find(n => n.id == ID);
		let indice = usuarios.indexOf(usuario)
		const actualizado = {
			...usuario,
			...req.body,
		};
		if (req.file) {
			//Eliminar la imagen original
			let imageFile = path.join(imagesPath, usuario.imagen)
			if (usuario.imagen && fs.existsSync(imageFile)) {
				fs.unlinkSync(imageFile);
			};
			//Cambiar el nombre de la imagen
			actualizado.imagen = req.file.filename;
		};
		usuarios[indice] = actualizado
		WriteFile(usersFilePath, usuarios);
		res.redirect("/usuario/" + ID + "/detalle");
	},	

	eliminar: (req, res) => {
		const users = GetFileObject(usersFilePath);
		let indice = users.findIndex(n => n.id == req.params.id)
		//Eliminar la imagen
		let imageFile = path.join(imagesPath, users[indice].imagen)
		if (users[indice].imagen && fs.existsSync(imageFile)) {
			fs.unlinkSync(imageFile);
		}
		//Eliminar el registro
		users.splice(indice,1)
		WriteFile(usersFilePath, users);
		res.redirect("/");
	},
};

function GetFileObject(filePath) {
	return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function WriteFile(filePath, content) {
	fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
}

module.exports = controller;