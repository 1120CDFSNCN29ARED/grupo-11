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

	const Modelo = sequelize.define(alias,columns,config);
	
	Modelo.associate = function(models) {
		Modelo.belongsTo(models.Marca, {
			as: "marcas",
			foreignKey: "marca_id"
		});
		
		Modelo.hasMany(models.Producto, {
			as: "productos",
			foreignKey: "modelo_id"
		});
	};

	return Modelo;
};