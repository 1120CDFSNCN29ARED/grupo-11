const db = require("../database/models");
const entidad = db.Marca;

module.exports = {
	ObtenerTodos: () => {
		return entidad.findAll({
			order: [["nombre", "ASC"]],
		});
	}
};