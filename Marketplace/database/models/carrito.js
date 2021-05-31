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

	const Carrito = sequelize.define(alias,columns,config);

	Carrito.associate = function(models) {

		Carrito.belongsTo(models.Producto, {
			as: "producto",
			foreignKey: "producto_id"
		});

		Carrito.belongsTo(models.Imagen, {
			as: "imagen",
			foreignKey: "producto_id",
		});
	};

	return Carrito;
};