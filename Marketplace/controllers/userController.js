const fs = require('fs');
let path = require('path')
const usersFilePath = path.join(__dirname, '../database/usuarios.json');
const imagesPath = path.join(__dirname, "../public/images/users/");

const controller = {

	crearForm: (req, res) => {
		let titulo = "Registro"
		res.render('usuario-crear', {titulo});
	},

	crearGuardar:(req, res) => {
		const usuarios = GetFileObject(usersFilePath);
		const nuevoId = usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1;
		const newUser = {
			id: nuevoId,
			...req.body,
			imagen: req.file.filename,
		};
		usuarios.push(newUser);
		WriteFile(usersFilePath, usuarios);
		res.redirect('/usuario/'+ nuevoId +"/detalle");
	},

	detalle: (req, res) => {
		let titulo = "Detalle del usuario"
		const users = GetFileObject(usersFilePath);
		let usuario = users.find(usuario => usuario.id == req.params.id);		
		res.render('usuario-detalle', {usuario, titulo});
	},

	editarForm: (req, res) => {
		let titulo = "Editar el Usuario"
		const users = GetFileObject(usersFilePath);
		let usuario = users.find(usuario => usuario.id == req.params.id);
		res.render('usuario-editar', {usuario, toThousand, titulo});
	},

	editarGuardar: (req, res) => {
		const usuarios = GetFileObject(usersFilePath);
		const productId = req.params.id;
		let usuario = usuarios.find(usuario => usuario.id == productId);
		let indice = usuarios.indexOf(usuario)
		const actualizado = {
			...usuario,
			...req.body,
		};
		usuarios[indice] = actualizado
		WriteFile(usersFilePath, usuarios);
		res.redirect("/usuario/" + userId + "/detalle");
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