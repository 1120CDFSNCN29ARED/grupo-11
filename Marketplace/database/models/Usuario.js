const Sequelize = require("sequelize");

module.exports = (sequelize) => {
	const alias = "Usuario";
	const columns = {
		nombre: Sequelize.STRING(500),
		apellido: Sequelize.STRING(500),
		email: Sequelize.STRING(500),
		contrasena: Sequelize.STRING(500),
		avatar: Sequelize.STRING(500),
		rol_id: Sequelize.INTEGER,
		creado_en: Sequelize.DATE,
		actualizado_en: Sequelize.DATE,
		borrado: Sequelize.BOOLEAN
	};
	const config = {
		tableName: "usuarios",
		createdAt: 'creado_en',
		updatedAt: 'actualizado_en'
	};

	const entidad = sequelize.define(alias,columns,config);
	entidad.associate = function(models) {

		entidad.belongsTo(models.Roles, {
			as: "rol",
			foreignKey: "rol_id"
		});
		
		entidad.hasMany(models.Producto, {
			as: "productosCreados",
			foreignKey: "creado_por"
		});

		entidad.hasMany(models.Carrito, {
			as: "carritos",
			foreignKey: "usuario_id"
		});
		
		entidad.hasMany(models.encabezadoVenta, {
			as: "compras",
			foreignKey: "usuario_id",
		});
	};

	return entidad;
};