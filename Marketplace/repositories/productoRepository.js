const db = require("../database/models");
const entidad = db.Producto;

module.exports = {
	ObtenerTodos: () => {
		return entidad.findAll({
			include: ["imagenes", "categoria", "marca", "modelo"],
			where: { borrado: false },
		});
	},
	ObtenerTodosInclusoBorrados: () => {
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
				borrado: false,
			},
			include: ["imagenes"],
		});
	},
	ObtenerMasVendidos: () => {
		return entidad.findAll({
			where: {
				mas_vendido: true,
				borrado: false,
			},
			include: ["imagenes"],
		});
	},
	ObtenerImagenes: async (id) => {
		const producto = await entidad.findByPk(id, {
			include: ["imagenes"],
		});

		return producto.imagenes;
	},
	Eliminar: (idProducto, idUsuario) => {
		return entidad.update(
			{
				borrado: true,
				actualizado_por: idUsuario,
			},
			{
				where: { id: idProducto },
			}
		);
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
		return entidad.update(
			{
				nombre: infoProducto.nombre,
				categoria_id: infoProducto.categoria,
				descripcion: infoProducto.descripcion,
				precio: precio,
				actualizado_por: usuarioId,
			},
			{
				where: { id: id },
			}
		);
	},
};
