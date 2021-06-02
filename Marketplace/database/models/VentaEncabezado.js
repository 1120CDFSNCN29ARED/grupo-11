const Sequelize = require("sequelize");

module.exports = (sequelize) => {
	const alias = "encabezadoVenta";
	const columns = {
		usuario_id: Sequelize.INTEGER,
		numero_factura: Sequelize.INTEGER,
		fecha_emision: Sequelize.DATE,
		importe: Sequelize.INTEGER
	};
	const config = {
		tableName: "ventas_encabezado",
		createdAt: 'fecha_emision',
		updatedAt: false
	};

	const entidad = sequelize.define(alias,columns,config);
	entidad.associate = function(models) {

		entidad.belongsTo(models.Usuario, {
			as: "usuario",
			foreignKey: "usuario_id"
		});
		
		entidad.hasMany(models.detalleVenta, {
			as: "detalleVenta",
			foreignKey: "venta_encabezado_id",
		});
	};
		
	return entidad;
};