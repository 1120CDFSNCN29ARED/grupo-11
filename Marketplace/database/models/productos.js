const Sequelize = require("sequelize");

module.export = (sequelize) => {
    const alias = "Productos";
    const columns = {
        nombre: Sequelize.STRING(500),
        categoria_id: Sequelize.INTEGER,
        marca_id: Sequelize.INTEGER,
        modelo_id: Sequelize.INTEGER,
        precio: Sequelize.DECIMAL,
        stock_disponible: Sequelize.INTEGER,
        mas_vendido: Sequelize.BOOLEAN,
        novedades: Sequelize.BOOLEAN,
        creado_por: Sequelize.INTEGER,
        creado_en: Sequelize.DATE,
        actualizado_por: Sequelize.INTEGER,
        actualizado_en: Sequelize.DATE,
        borrado: Sequelize.BOOLEAN
    };
    const config = {
        tableName: "productos",
        createdAt: 'creado_en',
        updatedAt: 'actualizado_en'
    };

    const Productos = sequelize.define(alias,columns,config);

    Productos.associate = function(models) {
        Productos.belongsTo(models.Categorias, {
            as: "cateroria",
            foreignKey: "categoria_id"
        });
    };
    
    Productos.associate = function(models) {
        Productos.belongsTo(models.Marcas, {
            as: "marca",
            foreignKey: "marca_id"
        });
    };

    Productos.associate = function(models) {
        Productos.belongsTo(models.Modelo, {
            as: "modelo",
            foreignKey: "modelo_id"
        });
    };

    Productos.associate = function(models) {
        Productos.hasMany(models.Imagenes, {
            as: "imagenes",
            foreignKey: "producto_id"
        });
    };
    
    Productos.associate = function(models) {
        Productos.hasMany(models.Carrito, {
            as: "carrito",
            foreignKey: "producto_id"
        });
    };
    
    Productos.associate = function(models) {
        Productos.hasMany(models.DetalleVentas, {
            as: "detalleVenta",
            foreignKey: "producto_id"
        });
    };

    return Productos;
};