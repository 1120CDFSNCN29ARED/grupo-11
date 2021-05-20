const modelosProducto = require("../../repositories/productoRepository");
const modelosCategoria = require("../../repositories/categoriaRepository");

module.exports = {
	listado: async (req, res) => {
        let listado = null;
        listado = await modelosProducto.ObtenerTodas();
        // *** PRODUCTOS ***
        let productos = [];
        listado.map(n => {
            productos.push({
                id: n.id,
                nombre: n.nombre,
                descripcion: n.descripcion,
                categoria: n.categoria.nombre,
                imagenes: n.imagenes,
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

	detalle: (req, res) => {
        let listado = null;
        ID = req.params.id;
        listado = await modelosProducto.ObtenerPorId(ID);
        // *** Proceso de la info ***
        let producto = [];
		listado.map(n => {
            producto.push({
                id: n.id,
                nombre: n.nombre,
                descripcion: n.descripcion,
                categoria: n.categoria.nombre,
                marca: n.marcas.nombre,
                modelo: n.modelos,
				precio: n.precio,
				stock: n.stock_disponible,
				imagenes: n.imagenes,
				url: "/api/productos/" + n.id,
            });
        });

    },
}