const Sequelize = require("sequelize");

module.export = (sequelize) => {
    const alias = "Carrito";
    const columns = {
        usuario_id: Sequelize.INTEGER,
        producto_id: Sequelize.INTEGER,
        cantidad: Sequelize.INTEGER
    };
    const config = {
        tableName: "carrito",
        timestamps: false
    };

    const Carrito = sequelize.define(alias,columns,config);

    Carrito.associate = function(models) {
        Carrito.belongsTo(models.Usuarios, {
            as: "usuario",
            foreignKey: "usuario_id"
        });
    };
    
    Carrito.associate = function(models) {
        Carrito.belongsTo(models.Productos, {
            as: "producto",
            foreignKey: "producto_id"
        });
    };

    return Carrito;
};