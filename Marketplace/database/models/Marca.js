const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    const alias = "Marca";
    const columns = {
        nombre: Sequelize.STRING(500)
    };
    const config = {
        tableName: "marcas",
        timestamps: false
    };

    const Marca = sequelize.define(alias,columns,config);

    Marca.associate = function(models) {
        Marca.hasMany(models.Modelo, {
            as: "modelos",
            foreignKey: "marca_id"
        });
        
        Marca.hasMany(models.Producto, {
            as: "productos",
            foreignKey: "marca_id"
        });
    };

    return Marca;
};