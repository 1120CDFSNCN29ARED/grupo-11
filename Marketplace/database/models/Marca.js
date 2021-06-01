const Sequelize = require("sequelize");

module.exports = (sequelize) => {
	const alias = "Marca";
	const columns = {
		nombre: Sequelize.STRING(500)
	};
	const config = {
		tableName: "marcas",
		timestamps: false
	};

	const entidad = sequelize.define(alias,columns,config);
	entidad.associate = function(models) {

		entidad.hasMany(models.Modelo, {
			as: "modelos",
			foreignKey: "marca_id"
		});
		
		entidad.hasMany(models.Producto, {
			as: "productos",
			foreignKey: "marca_id"
		});
	};

	return entidad;
};