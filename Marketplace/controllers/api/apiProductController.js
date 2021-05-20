const db = require("../../database/models");
const entidad = db.Producto;
const modelosProducto = require("../../repositories/productoRepository");
const modelosCategoria = require("../../repositories/categoriaRepository");

module.exports = {
	listado: async (req, res) => {
        let listado = null;
        listado = await modelosProducto.ObtenerTodas();
        // *** PRODUCTOS ***
        // Cantidad de productos
        let cantidad = {"cantidad de Productos": listado.length};
        // Listado de productos
        let productos = [];
        listado.map((n) => {
            productos.push({
                id: n.id,
                nombre: n.nombre,
                descripcion: n.descripcion,
                categoria: n.categoria.nombre,
                marca: n.marcas.nombre,
                url: "/api/productos/" + n.id,
            });
        });
		
        // *** CATEGORÍAS ***
        // Listado de categorías
        listado = await modelosCategoria.ObtenerTodas();
        let categorias = [];
        listado.map((n) => {
            let aux = [];
            n.productos.map((m) => {
                aux.push({
                    nombre: m.nombre,
                    url: "/api/productos/" + m.id,
                });
            });
            categorias.push({
                nombre: n.nombre,
                cantidad: n.productos.length,
                productos: aux,
            });
        });
        // *** FINAL ***
        let respuesta = [cantidad, categorias, productos];
        res.json(respuesta);
    },

	detalle: (req, res) => {

	},
}