// Requires ***********************************
const carritoRepository = require("../repositories/carritoRepository");
const productoRepository = require("../repositories/productoRepository");

module.exports = {
	listado: async (req, res) => {
		let usuarioID = req.session.usuarioLogeado.id;
		let carritos = await carritoRepository.ObtenerTodos(usuarioID);
		res.render("carrito", {
			titulo: "Carrito de Compras",
			carritos,
			toThousand,
		});
	},

	agregarCarrito: async (req, res) => {
		// Variables de uso general
		let usuarioID = req.session.usuarioLogeado.id;
		let productoID = parseInt(req.params.id);
		// Si el producto no estaba en el carrito, entonces agregarlo
		let avanzar = await carritoRepository.CarritoYaExistente(usuarioID, productoID).then((n) => !n);
		avanzar ? await carritoRepository.AgregarCarrito(usuarioID, productoID) : "";
		// Fin de la rutina
		return res.json(avanzar);
	},

	actualizarCarrito: async (req, res) => {
		// Actualizar carrito
		let cantCarritos = req.body.cantCarritos;
		for (let i = 0; i < cantCarritos; i++) {
			carritoID = req.body["carrito" + i];
			cantidad = req.body["cantidad" + i];
			cantidad > 0
				? await carritoRepository.ActualizarCarrito(carritoID, cantidad)
				: await carritoRepository.EliminarCarrito(carritoID);
		}
		// Comparar la compra vs el stock y si lo supera --> corregirlo y devolver al carrito
		let usuarioID = req.session.usuarioLogeado.id;
		let carritos = await carritoRepository.ObtenerTodos(usuarioID);
		let productos = await productoRepository.ObtenerTodos();
		var cambio = false;
		for (carrito of carritos) {
			productoID = carrito.producto_id;
			stockDisponible = productos.find((m) => m.id == productoID).stock_disponible;
			if (carrito.cantidad > stockDisponible) {
				await carritoRepository.ActualizarCarrito(carrito.id, stockDisponible);
				cambio = true; // Este valor lo deberíamos insertar en un campo en la tabla del carrito, para indicar que no tenemos stock suficiente e informarlo en el tablero del carrito de compras
			}
		}
		// Redireccionar
		res.redirect("/carrito");
	},

	eliminarCarrito: async (req, res) => {
		let carritoID = req.params.id;
		await carritoRepository.EliminarCarrito(carritoID);
		// Fin de la rutina
		return res.json(null);
	},

};

const toThousand = (n) => {
	return parseInt(n).toLocaleString("es-AR", { maximumFractionDigits: 0 });
};
