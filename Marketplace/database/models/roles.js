const Sequelize = require("sequelize");

module.export = (sequelize) => {
    const alias = "Roles";
    const columns = {
        nombre: Sequelize.STRING(500)
    };
    const config = {
        tableName: "roles",
        timestamps: false
    };

    const Roles = sequelize.define(alias,columns,config);

    Roles.associate = function(models) {
        Roles.hasMany(models.Usuarios, {
            as: "usaurios",
            foreignKey: "rol_id"
        });
    };

    return Roles;
};