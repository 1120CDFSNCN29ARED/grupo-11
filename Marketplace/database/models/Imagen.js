const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    const alias = "Imagen";
    const columns = {
        producto_id: Sequelize.INTEGER,
        ruta: Sequelize.STRING(500)
    };
    const config = {
        tableName: "imagenes",
        timestamps: false
    };

    const Imagen = sequelize.define(alias,columns,config);

    Imagen.associate = function(models) {
        Imagen.belongsTo(models.Producto, {
            as: "productos",
            foreignKey: "producto_id"
        });
    };

    return Imagen;
};