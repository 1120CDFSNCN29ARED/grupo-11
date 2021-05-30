const db = require("../database/models");
const entidad = db.Marca;

module.exports = {
	ObtenerTodas: () => {
		return entidad.findAll({
			order: [["nombre", "ASC"]],
		});
	}
};