const Sequelize = require("sequelize");

module.exports = (sequelize) => {
	const alias = "Imagen";
	const columns = {
		producto_id: Sequelize.INTEGER,
		ruta: Sequelize.STRING(500)
	};
	const config = {
		tableName: "imagenes",
		timestamps: false
	};

	const entidad = sequelize.define(alias,columns,config);
	entidad.associate = function(models) {

		entidad.belongsTo(models.Producto, {
			as: "productos",
			foreignKey: "producto_id"
		});
	};

	return entidad;
};