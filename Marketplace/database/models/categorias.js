const Sequelize = require("sequelize");

module.export = (sequelize) => {
    const alias = "Categorias";
    const columns = {
        nombre: Sequelize.STRING(500)
    };
    const config = {
        tableName: "categorias",
        timestamps: false
    };

    const Categorias = sequelize.define(alias,columns,config);

    Categorias.associate = function(models) {
        Categorias.hasMany(models.Productos, {
            as: "productos",
            foreignKey: "categoria_id"
        });
    };

    return Categorias;
};