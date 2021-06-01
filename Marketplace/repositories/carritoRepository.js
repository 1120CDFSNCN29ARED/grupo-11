const db = require("../database/models");
const entidad = db.Carrito;

module.exports = {

	ObtenerTodos: (usuarioID) => {
		return entidad.findAll({
			include: ["producto", "imagen"],
			where: { usuario_id: usuarioID },
		});
	},

	EliminarRegistro: (registroID) => {
		return entidad.destroy({
			where: { id: registroID },
		});
	},

	CarritoYaExistente: (usuarioID, productoID) => {
		return entidad
			.count({
				where: {
					usuario_id: usuarioID,
					producto_id: productoID,
				},
			})
			.then((n) => n > 0);
	},

	AgregarRegistro: (usuarioID, productoID) => {
		return entidad.create({
			usuario_id: usuarioID,
			producto_id: productoID,
			cantidad: 1,
		});
	},

	ActualizarCarrito: (infoCarrito, cantRegistros) => {
		for (let i = 0; i < cantRegistros; i++) {
			entidad.update(
				{ cantidad: infoCarrito["cantidad" + i] },
				{ where: { id: infoCarrito["registro" + i] } }
			);
		}
		return;
	},
	
};
