const db = require("../database/models");
const entidad = db.Modelo;

module.exports = {
	ObtenerTodas: () => {
		return entidad.findAll({
			    order:[['nombre','ASC']],
		});
	}
};