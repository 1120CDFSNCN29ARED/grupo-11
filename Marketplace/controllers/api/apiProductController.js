const productoRepository = require("../../repositories/productoRepository");
const categoriaRepository = require("../../repositories/categoriaRepository");

module.exports = {
	listado: async (req, res) => {
		let data = null;
		data = await productoRepository.ObtenerTodas();
		// *** PRODUCTOS ***
		let productos = [];
		data.map(n => {
			let aux=[]
			n.imagenes.map(m => aux.push(m.ruta));
			productos.push({
				id: n.id,
				nombre: n.nombre,
				descripcion: n.descripcion,
				categoria: n.categoria.nombre,
				imagenes: n.imagenes.map((m) => m.ruta),
				url: "/api/productos/" + n.id,
				creado: n.creado_en,
			});
		});
		let resumenProductos = {
			cantidad: data.length,
			detalle: productos,
		};
		// *** CATEGORÍAS ***
		data = await categoriaRepository.ObtenerTodas();
		let categorias = [];
		let totales={}
		data.map(n => {
			categorias.push({
				id: n.id,
				nombre: n.nombre,
				cantidad_de_productos: n.productos.length,
				productos: n.productos.map(m => ({
					id: m.id,
					nombre: m.nombre,
					url: "/api/productos/" + m.id,
				})),
			});
			totales[n.nombre] = n.productos.length
		});
		let resumenCategorias = {
			cantidad: data.length,
			detalle: categorias,
			totales: totales,
		};
		// *** FINAL ***
		let respuesta = {
			//productos: resumenProductos,
			//categorias: resumenCategorias,
			count: resumenProductos.cantidad,
			countByCategory: resumenCategorias.totales,
			products: resumenProductos.detalle,
		};
		res.json(respuesta);
	},

	detalle: async (req, res) => {
		let data = null;
		data = await productoRepository.ObtenerPorId(req.params.id);
		// *** Proceso de la info ***
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