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
		// Definir a dónde se va a redireccionar
		let urlOrigen = req.originalUrl.slice(1);
		urlOrigen = urlOrigen.slice(urlOrigen.indexOf("/") + 1, urlOrigen.lastIndexOf("/"));
		if (urlOrigen == "agregar/1") {urlDestino = "/"} else
		if (urlOrigen == "agregar/2") {urlDestino = "/producto/" + productoID + "/detalle"}
		// Averiguar si el carrito ya existe
		let avanzar = await carritoRepository.CarritoYaExistente(usuarioID, productoID).then((n) => !n);
		// Sumar al carrito
		avanzar ? await carritoRepository.AgregarCarrito(usuarioID, productoID) : "";
		// Redireccionar
		return res.redirect(urlDestino);
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
		let api = await productoRepository.ObtenerTodos();
		var cambio = false;
		for (carrito of carritos) {
			productoID = carrito.producto_id;
			stockDisponible = api.find((m) => m.id == productoID).stock_disponible;
			if (carrito.cantidad > stockDisponible) {
				await carritoRepository.ActualizarCarrito(carrito.id, stockDisponible);
				cambio = true;
			}
		}
		cambio ? res.redirect("/carrito") : "";
		// Redireccionar
		res.redirect("/carrito");
	},

	eliminarCarrito: async (req, res) => {
		let carritoID = req.params.id;
		await carritoRepository.EliminarCarrito(carritoID);
		res.redirect("/carrito");
	},

};

const toThousand = (n) => {
	return parseInt(n).toLocaleString("es-AR", { maximumFractionDigits: 0 });
};
