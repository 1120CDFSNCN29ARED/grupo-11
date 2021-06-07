// Requires ***********************************
const productoRepository = require("../repositories/productoRepository");
const carritoRepository = require("../repositories/carritoRepository");

module.exports = {
	index: async (req, res) => {
		let masVendidos = await productoRepository.ObtenerMasVendidos();
		let novedades = await productoRepository.ObtenerNovedades();
		let seccionesProductos = [
			{
				section: "masVendido",
				titulo: "Más vendidos",
				productos: masVendidos,
			},
			{
				section: "novedades",
				titulo: "Novedades",
				productos: novedades,
			},
		];
		let carritos=[]
		if (req.session.usuarioLogeado) {
			let usuarioID = req.session.usuarioLogeado.id;
			carritos = await carritoRepository
				.ObtenerTodos(usuarioID)
				.then((n) => n.map((m) => m.producto_id));
		}
		return res.render("index", {
			seccionesProductos,
			toThousand,
			titulo: "Guitar Shop",
			carritos,
		});
	},
};

const toThousand = (n) => {
	return parseInt(n).toLocaleString("es-AR", { maximumFractionDigits: 0 });
};
