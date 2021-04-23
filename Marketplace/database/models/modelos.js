const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    const alias = "Modelos";
    const columns = {
        marca_id: Sequelize.INTEGER,
        nombre: Sequelize.STRING(500)
    };
    const config = {
        tableName: "modelos",
        timestamps: false
    };

    const Modelos = sequelize.define(alias,columns,config);
    
    Modelos.associate = function(models) {
        Modelos.belongsTo(models.Marcas, {
            as: "marcas",
            foreignKey: "marca_id"
        });
    };
    
    Modelos.associate = function(models) {
        Modelos.hasMany(models.Productos, {
            as: "productos",
            foreignKey: "modelo_id"
        });
    };

    return Modelos;
};