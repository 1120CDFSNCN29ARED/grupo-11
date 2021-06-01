const Sequelize = require("sequelize");

module.exports = (sequelize) => {
	const alias = "VentaEncabezado";
	const columns = {
		usuario_id: Sequelize.INTEGER,
		numero_factura: Sequelize.INTEGER,
		fecha_emision: Sequelize.DATE,
		importe: Sequelize.DECIMAL
	};
	const config = {
		tableName: "ventas_encabezado",
		createdAt: 'fecha_emision',
		updatedAt: false
	};

	const Venta = sequelize.define(alias,columns,config);

	Venta.associate = function(models) {
		Venta.belongsTo(models.Usuario, {
			as: "usuarios",
			foreignKey: "usuario_id"
		});
		
		Venta.hasMany(models.DetalleVenta, {
			as: "detalleVentas",
			foreignKey: "ventas_encabezado_id",
		});
	};
		
	return Venta;
};