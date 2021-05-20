const modelosProducto = require("../../repositories/productoRepository");
const modelosCategoria = require("../../repositories/categoriaRepository");

module.exports = {
	listado: async (req, res) => {
		let listado = null;
		listado = await modelosProducto.ObtenerTodas();
		// *** PRODUCTOS ***
		let productos = [];
		listado.map(n => {
			let aux=[]
			n.imagenes.map(m => aux.push(m.ruta));
			productos.push({
				id: n.id,
				nombre: n.nombre,
				descripcion: n.descripcion,
				categoria: n.categoria.nombre,
				imagenes: aux,
				url: "/api/productos/" + n.id,
			});
		});
		let resumenProductos = {
			cantidad: listado.length,
			detalle: productos,
		};
		// *** CATEGORÍAS ***
		listado = await modelosCategoria.ObtenerTodas();
		let categorias = [];
		listado.map(n => {
			let aux = [];
			n.productos.map(m => {
				aux.push({
					id: m.id,
					nombre: m.nombre,
					url: "/api/productos/" + m.id,
				});
			});
			categorias.push({
				id: n.id,
				nombre: n.nombre,
				cantidad_de_productos: n.productos.length,
				productos: aux,
			});
		});
		let resumenCategorias = {
			cantidad: listado.length,
			detalle: categorias,
		};
		// *** FINAL ***
		let respuesta = {
			productos: resumenProductos,
			categorias: resumenCategorias,
		};
		res.json(respuesta);
	},

	detalle: async (req, res) => {
		let listado = null;
		listado = await modelosProducto.ObtenerPorId(req.params.id);
		// *** Proceso de la info ***
		// Obtener el nombre y URL de las imagenes
		let aux = []
		listado.imagenes.map(n => aux.push(n.ruta))
		let producto = {
			id: listado.id,
			nombre: listado.nombre,
			descripcion: listado.descripcion,
			categoria: listado.categoria.nombre,
			marca: listado.marcas.nombre,
			modelo: listado.modelos.nombre,
			precio: listado.precio,
			stock: listado.stock_disponible,
			imagenes: aux,
		};
		res.json(producto);
	},
}