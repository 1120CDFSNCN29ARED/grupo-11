const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    const alias = "DetalleVentas";
    const columns = {
        producto_id: Sequelize.INTEGER,
        venta_id: Sequelize.INTEGER,
        cantidad: Sequelize.INTEGER,
        precio: Sequelize.DECIMAL
    };
    const config = {
        tableName: "detalle_ventas",
        timestamps: false
    };

    const DetalleVentas = sequelize.define(alias,columns,config);

    DetalleVentas.associate = function(models) {
        DetalleVentas.belongsTo(models.Ventas, {
            as: "venta",
            foreignKey: "venta_id"
        });
    };
    
    DetalleVentas.associate = function(models) {
        DetalleVentas.belongsTo(models.Productos, {
            as: "producto",
            foreignKey: "producto_id"
        });
    };

    return DetalleVentas;
};