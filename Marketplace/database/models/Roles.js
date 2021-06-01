const Sequelize = require("sequelize");

module.exports = (sequelize) => {
	const alias = "Roles";
	const columns = {
		nombre: Sequelize.STRING(500)
	};
	const config = {
		tableName: "roles",
		timestamps: false
	};

	const entidad = sequelize.define(alias,columns,config);
	entidad.associate = function(models) {

		entidad.hasMany(models.Usuario, {
			as: "usuarios",
			foreignKey: "rol_id"
		});
	};

	return entidad;
};