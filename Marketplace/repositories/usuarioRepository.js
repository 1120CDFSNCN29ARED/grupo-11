const { Op } = require("sequelize");
const bcryptjs = require("bcryptjs");
const db = require("../database/models");
const entidad = db.Usuario;

module.exports = {
	ObtenerTodos: () => {
		return entidad.findAll({
			include: ["rol"],
			where: { borrado: false },
		});
	},
	ObtenerTodosInclusoBorrados: () => {
		return entidad.findAll({
			include: ["rol"],
		});
	},
	ObtenerPorId: (id) => {
		return entidad.findByPk(id, {
			include: ["rol"],
		});
	},
	ObtenerPorEmail: (email) => {
		return entidad.findOne({
			where: { email: email },
		});
	},
	EmailYaExistente: (email, id) => {
		return entidad
			.count({
				where: {
					id: { [Op.ne]: id },
					email: email,
				},
			})
			.then((n) => n > 0);
	},
	Crear: (infoUsuario, fileName) => {
		return entidad.create({
			nombre: infoUsuario.nombre,
			apellido: infoUsuario.apellido,
			email: infoUsuario.email,
			contrasena: bcryptjs.hashSync(infoUsuario.contrasena, 10),
			avatar: fileName,
			rol_id: 2,
		});
	},
	ActualizarPorUsuario: (id, infoUsuario, fileName) => {
		return entidad.update(
			{
				nombre: infoUsuario.nombre,
				apellido: infoUsuario.apellido,
				email: infoUsuario.email,
				contrasena: bcryptjs.hashSync(infoUsuario.contrasena, 10),
				avatar: fileName,
			},
			{
				where: { id: id },
			}
		);
	},
	ActualizarPorAdmin: (userId, infoUsuario) => {
		return entidad.update(
			{
				rol_id: infoUsuario.rol_id,
				borrado: infoUsuario.borrado,
			},
			{
				where: { id: userId },
			}
		);
	},
	Eliminar: (usuarioId) => {
		return entidad.update(
			{
				borrado: true,
				actualizado_por: usuarioId,
			},
			{
				where: { id: usuarioId },
			}
		);
	},
};
