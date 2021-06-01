const Sequelize = require("sequelize");

module.exports = (sequelize) => {
	const alias = "VentaDetalle";
	const columns = {
		producto_id: Sequelize.INTEGER,
		venta_id: Sequelize.INTEGER,
		cantidad: Sequelize.INTEGER,
		precio: Sequelize.DECIMAL
	};
	const config = {
		tableName: "ventas_detalle",
		timestamps: false,
	};

	const VentaDetalle = sequelize.define(alias,columns,config);

	VentaDetalle.associate = function(models) {
		VentaDetalle.belongsTo(models.VentaEncabezado, {
			as: "venta_encabezado",
			foreignKey: "venta_encabezado_id",
		});
		
		VentaDetalle.belongsTo(models.Producto, {
			as: "producto",
			foreignKey: "producto_id"
		});
	};

	return VentaDetalle;
};