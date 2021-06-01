// Requires ***********************************
const carritoRepository = require("../../repositories/carritoRepository");

module.exports = {

	contador: async (req, res) => {
		let usuarioID = req.session.usuarioLogeado.id;
		let contador = await carritoRepository
			.ObtenerTodos(usuarioID)
			.then((n) => n.length.toString());
		return res.json(contador);
	},
};
