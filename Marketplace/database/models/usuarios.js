const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    const alias = "Usuarios";
    const columns = {
        nombre: Sequelize.STRING(500),
        apellido: Sequelize.STRING(500),
        email: Sequelize.STRING(500),
        contrasena: Sequelize.STRING(500),
        avatar: Sequelize.STRING(500),
        rol_id: Sequelize.INTEGER,
        creado_en: Sequelize.DATE,
        actualizado_en: Sequelize.DATE,
        borrado: Sequelize.BOOLEAN
    };
    const config = {
        tableName: "usuarios",
        createdAt: 'creado_en',
        updatedAt: 'actualizado_en'
    };

    const Usuarios = sequelize.define(alias,columns,config);
    
    Usuarios.associate = function(models) {
        Usuarios.belongsTo(models.Roles, {
            as: "rol",
            foreignKey: "rol_id"
        });
    };
    
    Usuarios.associate = function(models) {
        Usuarios.hasMany(models.Carrito, {
            as: "carrito",
            foreignKey: "usuario_id"
        });
    };

    Usuarios.associate = function(models) {
        Usuarios.hasMany(models.Ventas, {
            as: "compras",
            foreignKey: "usuario_id"
        });
    };

    return Usuarios;
};