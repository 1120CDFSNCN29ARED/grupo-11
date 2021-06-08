const db = require("../database/models");
const entidad = db.Modelo;

module.exports = {
	ObtenerTodos: () => {
		return entidad.findAll({
			    order:[['nombre','ASC']],
		});
	}
};