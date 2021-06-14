const Sequelize = require("sequelize");

module.exports = (sequelize) => {
	const alias = "Carrito";
	const columns = {
		usuario_id: Sequelize.INTEGER,
		producto_id: Sequelize.INTEGER,
		cantidad: Sequelize.INTEGER
	};
	const config = {
		tableName: "carrito",
		timestamps: false
	};

	const entidad = sequelize.define(alias,columns,config);
	entidad.associate = function(models) {

		entidad.belongsTo(models.Producto, {
			as: "producto",
			foreignKey: "producto_id"
		});
	};

	return entidad;
};