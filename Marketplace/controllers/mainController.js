// Requires ***********************************
const productoRepository = require("../repositories/productoRepository");
const carritoRepository = require("../repositories/carritoRepository");

module.exports = {
	index: async (req, res) => {
		let novedades = await productoRepository.ObtenerNovedades();
		let masVendidos = await productoRepository.ObtenerMasVendidos();
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
		let productos = [];
		await productoRepository.ObtenerTodos().then(n => n.map(m => {
			productos.push({
				id: m.id,
				stock: m.stock_disponible,
			})
		}));
		if (req.session.usuarioLogeado) {
			let usuarioID = req.session.usuarioLogeado.id;
			var carritos = await carritoRepository
				.ObtenerTodos(usuarioID)
				.then((n) => n.producto_id);
		} else {
			var carritos = null;
		}
		return res.render("index", {
			seccionesProductos,
			toThousand,
			titulo: "Guitar Shop",
			productos,
			carritos,
		});
	},
};

const toThousand = (n) => {
	return parseInt(n).toLocaleString("es-AR", { maximumFractionDigits: 0 });
};
