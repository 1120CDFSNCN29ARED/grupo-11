const Sequelize = require("sequelize");

module.exports = (sequelize) => {
	const alias = "Rol";
	const columns = {
		nombre: Sequelize.STRING(500)
	};
	const config = {
		tableName: "roles",
		timestamps: false
	};

	const Rol = sequelize.define(alias,columns,config);

	Rol.associate = function(models) {
		Rol.hasMany(models.Usuario, {
			as: "usuarios",
			foreignKey: "rol_id"
		});
	};

	return Rol;
};