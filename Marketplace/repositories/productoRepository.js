const { Op } = require("sequelize");
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

	ActualizarStock: async (productoID, nuevoStock) => {
		return entidad.update(
			{ stock_disponible: nuevoStock },
			{ where: { id: productoID } }
		);
	},

	BuscarPorCategoriaPaginado: (categoriaId, limit, offset) => {
		let where = {
			borrado: false,
		};

		if (categoriaId) {
			where.categoria_id = categoriaId;
		}

		return entidad.findAndCountAll({
			where: where,
			limit: limit,
			offset: offset,
			include: ["imagenes"],
			distinct: true,
		});
	},

	BuscarPorValorPaginado: (searchValue, limit, offset) => {
		let where = {
			borrado: false,
		};

		if (searchValue) {
			where.nombre = {
				[Op.like]: "%" + searchValue + "%",
			};
		}
		return entidad.findAndCountAll({
			where: where,
			limit: limit,
			offset: offset,
			include: ["imagenes"],
			distinct: true,
		});
	},

	BuscarPorSeccionPaginado: (section, limit, offset) => {
		let where = {
			borrado: false,
		};

		if (section) {
			if (section == "masVendido") {
				where.mas_vendido = true;
			} else {
				where.novedades = true;
			}
		}
		return entidad.findAndCountAll({
			where: where,
			limit: limit,
			offset: offset,
			include: ["imagenes"],
			distinct: true,
		});
	},
};
