const { Op } = require("sequelize");
const db = require("../database/models");
const entidad = db.Producto;

module.exports = {
	ObtenerTodas: () => {
		return entidad.findAll({
			include: ["imagenes", "categoria", "marca", "modelo"],
		});
	},
	ObtenerPorId: (id) => {
		return entidad.findByPk(id, {
			include: ["imagenes", "categoria", "marca", "modelo"],
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
	Eliminar: (idProducto, idUsuario) => {
		return entidad.update({
			borrado: true,
			actualizado_por: idUsuario
		},
		{
			where: { id: idProducto },
		});
	},
	Crear: (infoProducto, precio, usuarioId) => {
		return entidad.create({
			nombre: infoProducto.nombre,
			descripcion: infoProducto.descripcion,
			categoria_id: infoProducto.categoria,
			marca_id: infoProducto.marca,
			modelo_id: infoProducto.modelo,
			precio: precio,
			stock_disponible: infoProducto.stock,
			creado_por: usuarioId,
		});
	},
	Actualizar: (id, infoProducto, precio, usuarioId) => {
		return entidad.update({
			nombre: infoProducto.nombre,
			categoria_id: infoProducto.categoria,
			descripcion: infoProducto.descripcion,
			precio: precio,
			actualizado_por: usuarioId
		},
		{
			where: { id: id },
		});
	},
	Buscar: (categoriaId, searchValue) => {
		let where;

		if (!categoriaId && !searchValue) {
			where = {
				borrado: false
			}
		} else {
			if (categoriaId) {
				where = {
					categoria_id: categoriaId,
					borrado: false
				}
			}
			
			if (searchValue) {
				where = {
					nombre: {
						[Op.like]: '%' + searchValue + '%'
					},
					borrado: false
				}
			}
		}

		return entidad.findAll({
			where: where,
			include: [ "imagenes" ]
		});
	}
};