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
		let registroID = req.params.id
		await carritoRepository.EliminarRegistro(registroID);
		res.redirect("/carrito")
	},
	actualizarCarrito:  async (req, res) => {
		//return res.send(req.body)
		let cantRegistros = req.body.cantRegistros;
		await carritoRepository.ActualizarCarrito(req.body, cantRegistros);
		res.redirect("/carrito");
	}
};

const toThousand = (n) => {
	return parseInt(n).toLocaleString("es-AR", { maximumFractionDigits: 0 });
};
