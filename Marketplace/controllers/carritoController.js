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
		urlOrigen = urlOrigen.slice(
			urlOrigen.indexOf("/") + 1,
			urlOrigen.lastIndexOf("/")
		);
		if (urlOrigen == "agregar/1") {
			urlDestino = "/";
		} else if (urlOrigen == "agregar/2") {
			urlDestino = "/producto/" + productoID + "/detalle";
		}
		// Averiguar si el carrito ya existe
		let avanzar = await carritoRepository
			.CarritoYaExistente(usuarioID, productoID)
			.then((n) => !n);
		// Sumar al carrito
		avanzar
			? await carritoRepository.AgregarRegistro(usuarioID, productoID)
			: "";
		// Redireccionar
		return res.redirect(urlDestino);
	},

	actualizarCarrito: async (req, res) => {
		// Actualizar carrito
		let cantRegistros = req.body.cantRegistros;
		for (let i = 0; i < cantRegistros; i++) {
			carritoID = req.body["carrito" + i];
			cantidad = req.body["cantidad" + i];
			cantidad > 0
				? await carritoRepository.ActualizarCarrito(carritoID, cantidad)
				: await carritoRepository.EliminarRegistro(carritoID);
		}
		// Comparar la compra vs el stock y si lo supera --> devolver al carrito
		let usuarioID = req.session.usuarioLogeado.id;
		let carritos = await carritoRepository.ObtenerTodos(usuarioID);
		let api = await productoRepository.ObtenerTodos();
		let supera = await carritoRepository.VerificarStock(carritos, api);
		supera ? res.redirect("/carrito") : "";
		// Redireccionar
		res.redirect("/carrito");
	},

	eliminarCarrito: async (req, res) => {
		let carritoID = req.params.id;
		await carritoRepository.EliminarRegistro(carritoID);
		res.redirect("/carrito");
	},

};

const toThousand = (n) => {
	return parseInt(n).toLocaleString("es-AR", { maximumFractionDigits: 0 });
};
