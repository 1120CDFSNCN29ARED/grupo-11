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
		let registroID = req.params.id
		await carritoRepository.EliminarRegistro(registroID);
		res.redirect("/carrito")
	},
	actualizarCarrito:  async (req, res) => {
		let cantRegistros = req.body.cantRegistros;
		for (let i = 0; i < cantRegistros; i++) {
			carritoID = req.body["registro" + i];
			cantidad = req.body["cantidad" + i];
			await carritoRepository.ActualizarCarrito(carritoID, cantidad);
		}
		res.redirect("/carrito");
	}
};

const toThousand = (n) => {
	return parseInt(n).toLocaleString("es-AR", { maximumFractionDigits: 0 });
};
