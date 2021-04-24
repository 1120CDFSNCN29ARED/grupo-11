const db = require("../database/models");
const entidad = db.Producto;

module.exports = {
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