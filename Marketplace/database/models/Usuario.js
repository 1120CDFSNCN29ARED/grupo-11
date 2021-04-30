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

	const Usuario = sequelize.define(alias,columns,config);
	
	Usuario.associate = function(models) {
		Usuario.belongsTo(models.Rol, {
			as: "roles",
			foreignKey: "rol_id"
		});
		
		Usuario.hasMany(models.Carrito, {
			as: "carritos",
			foreignKey: "usuario_id"
		});
		
		Usuario.hasMany(models.Venta, {
			as: "compras",
			foreignKey: "usuario_id"
		});
	};

	return Usuario;
};