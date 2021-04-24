const db = require("../database/models");
const entidad = db.Producto;

module.exports = {
    ObtenerPorId: (id) => {
        return entidad.findByPk(id, {
            include: [ "imagenes", "categoria" ]
        });
    },
    ObtenerNovedades: () => {
        return entidad.findAll({
            where: {
                novedades: true,
                borrado: false
            },
            include: [ "imagenes" ]
        });
    },
    ObtenerMasVendidos: () => {
        return entidad.findAll({
            where: {
                mas_vendido: true,
                borrado: false
            },
            include: [ "imagenes" ]
        });
    }
};