const Sequelize = require("sequelize");

module.export = (sequelize) => {
    const alias = "Marcas";
    const columns = {
        nombre: Sequelize.STRING(500)
    };
    const config = {
        tableName: "marcas",
        timestamps: false
    };

    const Marcas = sequelize.define(alias,columns,config);

    Marcas.associate = function(models) {
        Marcas.hasMany(models.Modelos, {
            as: "modelos",
            foreignKey: "marca_id"
        });
    };

    Marcas.associate = function(models) {
        Marcas.hasMany(models.Productos, {
            as: "productos",
            foreignKey: "marca_id"
        });
    };

    return Marcas;
};