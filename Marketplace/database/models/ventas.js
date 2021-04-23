const Sequelize = require("sequelize");

module.export = (sequelize) => {
    const alias = "Ventas";
    const columns = {
        usuario_id: Sequelize.INTEGER,
        numero_factura: Sequelize.INTEGER,
        fecha_emision: Sequelize.DATE,
        importe: Sequelize.DECIMAL
    };
    const config = {
        tableName: "ventas",
        createdAt: 'fecha_emision'
    };

    const Ventas = sequelize.define(alias,columns,config);

    Ventas.associate = function(models) {
        Ventas.belongsTo(models.Usuarios, {
            as: "usuario",
            foreignKey: "usuario_id"
        });
    };
    
    Ventas.associate = function(models) {
        Ventas.hasOne(models.DetalleVentas, {
            as: "detalleVenta",
            foreignKey: "venta_id"
        });
    };
        
    return Ventas;
};