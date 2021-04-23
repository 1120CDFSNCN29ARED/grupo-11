const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    const alias = "Imagenes";
    const columns = {
        producto_id: Sequelize.INTEGER,
        ruta: Sequelize.STRING(500)
    };
    const config = {
        tableName: "imagenes",
        timestamps: false
    };

    const Imagenes = sequelize.define(alias,columns,config);

    Imagenes.associate = function(models) {
        Imagenes.belongsTo(models.Productos, {
            as: "producto",
            foreignKey: "producto_id"
        });
    };

    return Imagenes;
};