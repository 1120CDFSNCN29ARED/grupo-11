const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    const alias = "Producto";
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

    const Producto = sequelize.define(alias,columns,config);

    Producto.associate = function(models) {
        Producto.belongsTo(models.Categoria, {
            as: "caterorias",
            foreignKey: "categoria_id"
        });
        
        Producto.belongsTo(models.Marca, {
            as: "marcas",
            foreignKey: "marca_id"
        });
        
        Producto.belongsTo(models.Modelo, {
            as: "modelos",
            foreignKey: "modelo_id"
        });
        
        Producto.hasMany(models.Imagen, {
            as: "imagenes",
            foreignKey: "producto_id"
        });
        
        Producto.hasMany(models.Carrito, {
            as: "carritos",
            foreignKey: "producto_id"
        });
        
        Producto.hasMany(models.DetalleVenta, {
            as: "detalleVentas",
            foreignKey: "producto_id"
        });
    };

    return Producto;
};