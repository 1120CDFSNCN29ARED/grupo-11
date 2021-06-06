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
		// Si el producto no estaba en el carrito, entonces agregarlo
		let avanzar = await carritoRepository.CarritoYaExistente(usuarioID, productoID).then(n => !n)
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
