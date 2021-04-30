const Sequelize = require("sequelize");

module.exports = (sequelize) => {
	const alias = "DetalleVenta";
	const columns = {
		producto_id: Sequelize.INTEGER,
		venta_id: Sequelize.INTEGER,
		cantidad: Sequelize.INTEGER,
		precio: Sequelize.DECIMAL
	};
	const config = {
		tableName: "detalle_ventas",
		timestamps: false
	};

	const DetalleVenta = sequelize.define(alias,columns,config);

	DetalleVenta.associate = function(models) {
		DetalleVenta.belongsTo(models.Venta, {
			as: "ventas",
			foreignKey: "venta_id"
		});
		
		DetalleVenta.belongsTo(models.Producto, {
			as: "productos",
			foreignKey: "producto_id"
		});
	};

	return DetalleVenta;
};