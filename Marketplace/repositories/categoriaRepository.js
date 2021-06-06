const db = require("../database/models");
const entidad = db.Categoria;

module.exports = {
	ObtenerTodos: () => {
		return entidad.findAll({
			include: ["productos"],
		});
	},
	ObtenerPorId: (id) => {
		return entidad.findByPk(id);
	}
};