const db = require("../database/models");
const entidad = db.Producto;

module.exports = {
    ObtenerPorId: async (id) => {
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
    },
    ObtenerImagenes: async (id) => {
        const producto = await entidad.findByPk(id, {
            include: [ "imagenes" ]
        });

        return producto.imagenes;
    },
    Eliminar: (id, usuario) => {
        return entidad.update({
            borrado: true,
            actualizado_por: usuario
        },
        {
            where: { id: id },
        });
    },
    Crear: (productoData, precio, usuarioId) => {
        return entidad.create({
            nombre: productoData.nombre,
            descripcion: productoData.descripcion,
            categoria_id: 1,
            marca_id: 1,
            modelo_id: 1,
            precio: precio,
            stock_disponible: 100,
            mas_vendido: false,
            novedades: true,
            creado_por: usuarioId
        });
    },
    Actualizar: (id, productoData, precio, usuarioId) => {
        return entidad.update({
            nombre: productoData.nombre,
            descripcion: productoData.descripcion,
            precio: precio,
            actualizado_por: usuarioId
        },
        {
            where: { id: id },
        });
    }
};