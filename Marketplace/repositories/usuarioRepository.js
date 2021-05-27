const { Op } = require("sequelize");
const bcryptjs = require("bcryptjs");
const db = require("../database/models");
const entidad = db.Usuario;
const fs = require("fs");
const path = require("path");
const imagesPath = path.join(__dirname, "../public/images/users/");

module.exports = {
	ObtenerTodos: () => {
		return entidad.findAll();
	},
	ObtenerPorId: (id) => {
		return entidad.findByPk(id, {
			include: [ "roles" ]
		});
	},
	ObtenerPorEmail: (email) => {
		return entidad.findOne({
			where: {email: email}
		});
	},
	EmailYaExistente: async (email, id) => {
		let cantidad = await entidad.count({
			where: {
				id: {[Op.ne]: id},
				email: email,
			}
		});
		return cantidad > 0;
	},
	Crear: (infoUsuario, fileName) => {
		return entidad.create({
			nombre: infoUsuario.nombre,
			apellido: infoUsuario.apellido,
			email: infoUsuario.email,
			contrasena: bcryptjs.hashSync(infoUsuario.contrasena, 10),
			avatar: fileName,
			rol_id: 2
		});
	},
	Actualizar: (id, infoUsuario, fileName) => {
		return entidad.update({
			nombre: infoUsuario.nombre,
			apellido: infoUsuario.apellido,
			email: infoUsuario.email,
			contrasena: bcryptjs.hashSync(infoUsuario.contrasena, 10),
			avatar: fileName
		},
		{
			where: { id: id },
		});
	},
	Eliminar: (usuarioId) => {
		entidad
			.findByPk(usuarioId)
			.then((n) => n.avatar)
			.then((n) => BorrarArchivoDeImagen(n));
		return entidad.update({
			borrado: true,
			actualizado_por: usuarioId
		}, 
		{
			where: { id: usuarioId },
		});
	},
};

function BorrarArchivoDeImagen(nombreDeArchivo) {
	let imageFile = path.join(imagesPath, nombreDeArchivo);
	if (nombreDeArchivo && fs.existsSync(imageFile)) {
		fs.unlinkSync(imageFile);
	}
}
