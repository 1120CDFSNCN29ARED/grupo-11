const Sequelize = require("sequelize");

module.exports = (sequelize) => {
	const alias = "detalleVenta";
	const columns = {
		producto_id: Sequelize.INTEGER,
		venta_encabezado_id: Sequelize.INTEGER,
		cantidad: Sequelize.INTEGER,
		precio: Sequelize.INTEGER,
	};
	const config = {
		tableName: "ventas_detalle",
		timestamps: false,
	};

	const entidad = sequelize.define(alias,columns,config);
	entidad.associate = function(models) {

		entidad.belongsTo(models.encabezadoVenta, {
			as: "venta_encabezado",
			foreignKey: "venta_encabezado_id",
		});
		
		entidad.belongsTo(models.Producto, {
			as: "producto",
			foreignKey: "producto_id"
		});
	};

	return entidad;
};