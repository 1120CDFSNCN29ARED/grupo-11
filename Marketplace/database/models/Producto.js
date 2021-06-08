const Sequelize = require("sequelize");

module.exports = (sequelize) => {
	const alias = "Producto";
	const columns = {
		nombre: Sequelize.STRING(500),
		descripcion: Sequelize.STRING(500),
		categoria_id: Sequelize.INTEGER,
		marca_id: Sequelize.INTEGER,
		modelo_id: Sequelize.INTEGER,
		precio: Sequelize.DECIMAL,
		stock_disponible: Sequelize.INTEGER,
		mas_vendido: Sequelize.BOOLEAN,
		novedades: Sequelize.BOOLEAN,
		creado_por: Sequelize.INTEGER,
		creado_en: Sequelize.DATE,
		actualizado_por: Sequelize.INTEGER,
		actualizado_en: Sequelize.DATE,
		borrado: Sequelize.BOOLEAN
	};
	const config = {
		tableName: "productos",
		createdAt: 'creado_en',
		updatedAt: 'actualizado_en'
	};

	const entidad = sequelize.define(alias,columns,config);
	entidad.associate = function(models) {

		entidad.belongsTo(models.Usuario, {
			as: "creadoPor",
			foreignKey: "creado_por"
		});

		entidad.belongsTo(models.Categoria, {
			as: "categoria",
			foreignKey: "categoria_id"
		});
		
		entidad.belongsTo(models.Marca, {
			as: "marca",
			foreignKey: "marca_id"
		});
		
		entidad.belongsTo(models.Modelo, {
			as: "modelo",
			foreignKey: "modelo_id"
		});
		
		entidad.hasMany(models.Imagen, {
			as: "imagenes",
			foreignKey: "producto_id"
		});
		
		entidad.hasMany(models.Carrito, {
			as: "carritos",
			foreignKey: "producto_id"
		});
		
		entidad.hasMany(models.detalleVenta, {
			as: "detalleVentas",
			foreignKey: "producto_id",
		});
	};

	return entidad;
};