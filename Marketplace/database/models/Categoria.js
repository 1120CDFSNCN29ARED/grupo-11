const Sequelize = require("sequelize");

module.exports = (sequelize) => {
	const alias = "Categoria";
	const columns = {
		nombre: Sequelize.STRING(500)
	};
	const config = {
		tableName: "categorias",
		timestamps: false
	};

	const entidad = sequelize.define(alias,columns,config);
	entidad.associate = function(models) {

		entidad.hasMany(models.Producto, {
			as: "productos",
			foreignKey: "categoria_id"
		});
	};

	return entidad;
};