const db = require("../database/models");
const entidad = db.Roles;

module.exports = {
	ObtenerTodos: () => {
		return entidad.findAll();
	},
};