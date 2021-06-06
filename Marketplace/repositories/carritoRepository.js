const db = require("../database/models");
const entidad = db.Carrito;

module.exports = {
	ObtenerTodos: (usuarioID) => {
		return entidad.findAll({
			include: ["producto", "imagen"],
			where: { usuario_id: usuarioID },
		});
	},

	EliminarRegistro: (carritoID) => {
		return entidad.destroy({
			where: { id: carritoID },
		});
	},

	CarritoYaExistente: (usuarioID, productoID) => {
		return entidad
			.count({
				where: {
					usuario_id: usuarioID,
					producto_id: productoID,
				},
			})
			.then((n) => n > 0);
	},

	AgregarRegistro: (usuarioID, productoID) => {
		return entidad.create({
			usuario_id: usuarioID,
			producto_id: productoID,
			cantidad: 1,
		});
	},

	ActualizarCarrito: (carritoID, cantidad) => {
		return entidad.update(
			{ cantidad: cantidad },
			{ where: { id: carritoID } }
		);
	},

	ImporteCarrito: async (usuarioID) => {
		let carritos = await entidad.findAll({
			include: ["producto"],
			where: { usuario_id: usuarioID },
		});
		let acumulador = 0;
		for (n of carritos) {
			cant = n.cantidad;
			precio = n.producto.precio;
			acumulador = acumulador + cant * precio;
		}
		return acumulador;
	},

	ActualizarStock: async (carrito, stockDisponible) => {
		// Elimina el producto del carrito si la cantidad pedida es cero o negativa
		if (carrito.cantidad <= 0) {
			entidad.destroy({ where: { id: carrito.id } });
		} else {
			// Actualiza la cantidad del carrito para igualarla con la del stock
			await entidad.update(
				{ cantidad: stockDisponible },
				{ where: { id: carrito.id } }
			);
		}
	},
};
