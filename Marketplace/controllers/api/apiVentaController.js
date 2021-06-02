// Requires ***********************************
const ventasRepository = require("../../repositories/ventasRepository");

module.exports = {

	historial: async (req, res) => {
		let data = null;
		// *** PRODUCTOS ***
		data = await ventasRepository.ObtenerTodos();
		// let productos = [];
		// data.map(n => {
		// 	productos.push({
		// 		id: n.id,
		// 		nombre: n.nombre,
		// 		marca: n.marca.nombre,
		// 		modelo: n.modelo.nombre,
		// 		descripcion: n.descripcion,
		// 		categoria: n.categoria.nombre,
		// 		imagenes: n.imagenes.map(m => "/images/products/" + m.ruta),
		// 		precio: n.precio,
		// 		stock: n.stock_disponible,
		// 		url: "/api/productos/" + n.id,
		// 		creado: n.creado_en,
		// 	});
		// });
		// *** FINAL ***
		let respuesta = {
			count: productos.length,
			products: productos,
		};
		res.json(data);
	},
};
