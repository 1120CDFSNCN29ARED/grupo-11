const fs = require('fs');
let path = require('path')
const usersFilePath = path.join(__dirname, '../database/usuarios.json');
const imagesPath = path.join(__dirname, "../public/images/users/");

const toThousand = (n) => {return n.toLocaleString("es-AR", {maximumFractionDigits: 0})}

const controller = {
	crearForm: (req, res) => {
		res.render('usuario-crear');
	},
	crearGuardar:(req, res) =>{
		const usuarios = GetFileObject(usersFilePath);
		const nuevoId = usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1;
		const newProduct = {
			id: nuevoId,
			...req.body,
		};
		usuarios.push(newProduct);
		WriteFile(usersFilePath, usuarios);
		res.redirect('/');
	},
	detalle: (req, res) => {
		const users = GetFileObject(usersFilePath);
		let usuario = users.find(usuario => usuario.id == req.params.id);
		
		res.render('usuario-detalle', { usuario, toThousand });
	},
	editarForm: (req, res) => {
		const users = GetFileObject(usersFilePath);
		let usuario = users.find(usuario => usuario.id == req.params.id);
		
		res.render('usuario-editar', { usuario, toThousand });
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
		res.redirect("/usuario/" + productId);
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
	return JSON.parse(fs.readFileSync(FilePath, 'utf-8'));
}

function WriteFile(filePath, content) {
	fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
}

module.exports = controller;