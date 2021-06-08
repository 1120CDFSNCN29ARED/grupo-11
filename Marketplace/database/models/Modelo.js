const Sequelize = require("sequelize");

module.exports = (sequelize) => {
	const alias = "Modelo";
	const columns = {
		marca_id: Sequelize.INTEGER,
		nombre: Sequelize.STRING(500)
	};
	const config = {
		tableName: "modelos",
		timestamps: false
	};

	const entidad = sequelize.define(alias,columns,config);
	entidad.associate = function(models) {

		entidad.belongsTo(models.Marca, {
			as: "marcas",
			foreignKey: "marca_id"
		});
		
		entidad.hasMany(models.Producto, {
			as: "productos",
			foreignKey: "modelo_id"
		});
	};

	return entidad;
};