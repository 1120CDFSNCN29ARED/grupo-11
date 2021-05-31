const carritoRepository = require("../repositories/carrito");

module.exports = {
	listado: async (req, res) => {
		let usuarioID = req.session.usuarioLogeado.id;
		let registros = await carritoRepository.ObtenerTodos(usuarioID);
		res.render("carrito", {
			titulo: "Carrito de Compras",
			registros,
			toThousand,
		});
	},

	eliminarRegistro: async (req, res) => {
		let registroID = req.params.id;
		await carritoRepository.EliminarRegistro(registroID);
		res.redirect("/carrito");
	},

	agregarRegistro: async (req, res) => {
		// Variables de uso general
		let usuarioID = req.session.usuarioLogeado.id;
		let productoID = parseInt(req.params.id);
		// Definir a dónde se va a redireccionar
		let urlOrigen = req.originalUrl.slice(9);
		urlOrigen = urlOrigen.slice(0, urlOrigen.lastIndexOf("/"));
		if (urlOrigen == "agregar-desde-listado") {(urlDestino = "/")} else
		if (urlOrigen == "agregar-desde-detalle") {urlDestino = "/producto/" + productoID + "/detalle"}
		// Averiguar si el carrito ya existe
		let avanzar = await carritoRepository.CarritoYaExistente(usuarioID, productoID).then(n => !n)
		// Sumar al carrito
		avanzar ? await carritoRepository.AgregarRegistro(usuarioID, productoID) : ""
		// Redireccionar
		return res.redirect(urlDestino);
	},

	actualizarCarrito: async (req, res) => {
		let cantRegistros = req.body.cantRegistros;
		await carritoRepository.ActualizarCarrito(req.body, cantRegistros);
		res.redirect("/carrito");
	},

	contador: async (req, res) => {
		let usuarioID = req.session.usuarioLogeado.id;
		let contador = await carritoRepository.ObtenerTodos(usuarioID).then(n => n.length.toString())
		return res.json(contador)
	},

};

const toThousand = (n) => {
	return parseInt(n).toLocaleString("es-AR", { maximumFractionDigits: 0 });
};
