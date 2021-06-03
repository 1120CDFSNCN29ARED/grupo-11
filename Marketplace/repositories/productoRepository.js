const db = require("../database/models");
const entidad = db.Producto;

module.exports = {
	ObtenerTodos: () => {
		return entidad.findAll({
			include: ["imagenes", "categoria", "marca", "modelo", "creadoPor"],
			where: { borrado: false },

		});
	},

	ObtenerTodosInclusoBorrados: () => {
		return entidad.findAll({
			include: ["imagenes", "categoria", "marca", "modelo"],
		});
	},

	ObtenerPorId: (productoID) => {
		return entidad.findByPk(productoID, {
			include: ["imagenes", "categoria", "marca", "modelo", "creadoPor"],
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

  Actualizar: (productoID, infoProducto, precio, usuarioId) => {
		return entidad.update(
			{
				nombre: infoProducto.nombre,
				categoria_id: infoProducto.categoria,
				descripcion: infoProducto.descripcion,
				precio: precio,
				actualizado_por: usuarioId,
			},
			{
				where: { id: productoID },
			}
		);
	},

  // Disminuye el stock disponible de un producto cuando se produce su venta
	DisminuirStock: async (productoID, cantidad) => {
		let stock_disponible = await entidad
			.findByPk(productoID)
			.then((n) => n.stock_disponible);
		let nuevoStock = stock_disponible - cantidad;
		return entidad.update(
			{stock_disponible: nuevoStock},
			{where: { id: productoID }}
		);
	},
};
