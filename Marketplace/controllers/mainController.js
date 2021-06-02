const productoRepository = require("../repositories/productoRepository");

module.exports = {
	index: async (req, res) => {
		let novedades = await productoRepository.ObtenerNovedades();
		let masVendidos = await productoRepository.ObtenerMasVendidos()

		let seccionesProductos = [
			{
				section: "masVendido",
				titulo: "Mas vendidos",
				productos: masVendidos
			},
			{
				section: "novedades",
				titulo: "Novedades",
				productos: novedades
			}
		];

		return res.render("index", {
			seccionesProductos,
			toThousand,
			titulo: "Guitar Shop",
		});
	},
};

const toThousand = (n) => {
	return parseInt(n).toLocaleString("es-AR", { maximumFractionDigits: 0 });
}
