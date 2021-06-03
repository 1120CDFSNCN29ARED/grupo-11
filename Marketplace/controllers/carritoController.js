const carritoRepository = require("../repositories/carritoRepository");

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
		// Fin de la rutina
		return res.json(null);
	},

	agregarRegistro: async (req, res) => {
		// Variables de uso general
		let usuarioID = req.session.usuarioLogeado.id;
		let productoID = parseInt(req.params.id);
		// Definir a dónde se va a redireccionar
		let urlOrigen = req.originalUrl.slice(1)
		urlOrigen = urlOrigen.slice(urlOrigen.indexOf("/")+1, urlOrigen.lastIndexOf("/"));
		// Averiguar si el carrito ya existe
		let avanzar = await carritoRepository.CarritoYaExistente(usuarioID, productoID).then(n => !n)
		// Si el producto no estaba en el carrito, entonces agregarlo
		avanzar ? await carritoRepository.AgregarRegistro(usuarioID, productoID) : ""
		// Fin de la rutina
		return res.json(null);
	},

	actualizarCarrito: async (req, res) => {

		let cantRegistros = req.body.cantRegistros;
		for (let i = 0; i < cantRegistros; i++) {
			carritoID = req.body["registro" + i];
			cantidad = req.body["cantidad" + i];
			await carritoRepository.ActualizarCarrito(carritoID, cantidad);
		}
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
