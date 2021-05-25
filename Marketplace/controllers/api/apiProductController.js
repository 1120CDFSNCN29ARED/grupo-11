const productoRepository = require("../../repositories/productoRepository");
const categoriaRepository = require("../../repositories/categoriaRepository");

module.exports = {
	listado: async (req, res) => {
		let data = null;
		// *** PRODUCTOS ***
		data = await productoRepository.ObtenerTodas();
		let productos = [];
		data.map(n => {
			productos.push({
				id: n.id,
				nombre: n.nombre,
				marca: n.marcas.nombre,
				modelo: n.modelos.nombre,
				descripcion: n.descripcion,
				categoria: n.categoria.nombre,
				imagenes: n.imagenes.map(m => m.ruta),
				precio: n.precio,
				url: "/api/productos/" + n.id,
				creado: n.creado_en,
			});
		});
		// *** CATEGORÍAS ***
		data = await categoriaRepository.ObtenerTodas();
		let totales = {};
		data.map(n => {totales[n.nombre] = n.productos.length});
		// *** FINAL ***
		let respuesta = {
			count: productos.length,
			countByCategory: totales,
			products: productos,
		};
		res.json(respuesta);
	},

	detalle: async (req, res) => {
		let data = null;
		data = await productoRepository.ObtenerPorId(req.params.id);
		let producto = {
			id: data.id,
			nombre: data.nombre,
			descripcion: data.descripcion,
			categoria: data.categoria.nombre,
			marca: data.marcas.nombre,
			modelo: data.modelos.nombre,
			precio: data.precio,
			stock: data.stock_disponible,
			imagenes: data.imagenes.map(n => n.ruta),
		};
		res.json(producto);
	},
}