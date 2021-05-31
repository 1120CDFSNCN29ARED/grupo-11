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
	ActualizarCarrito: (infoCarrito, cantRegistros) => {
		for (let i = 0; i < cantRegistros; i++) {
			entidad.update(
				{ cantidad: infoCarrito["cantidad" + i] },
				{ where: { id: infoCarrito["registro" + i] } }
			);
		}
	},
};
