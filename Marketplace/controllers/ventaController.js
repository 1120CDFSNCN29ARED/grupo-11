// Requires ***********************************
const productoRepository = require("../repositories/productoRepository");
const carritoRepository = require("../repositories/carritoRepository");
const ventasRepository = require("../repositories/ventasRepository");

module.exports = {
	kickOff: async (req, res) => {
		let usuarioID = req.session.usuarioLogeado.id;
		let carritos = await carritoRepository.ObtenerTodos(usuarioID);
		// Obtener la cabecera de la venta
		let importe = await carritoRepository.ImporteCarrito(usuarioID);
		let cabeceraID = await ventasRepository.AgregarCabecera(
			usuarioID,
			importe
		);
		// Obtener el detalle de venta
		let detalle = [];
		carritos.map((n) => {
			detalle.push({
				producto_id: n.producto_id,
				venta_encabezado_id: cabeceraID,
				cantidad: n.cantidad,
				precio: n.producto.precio,
			});
		});
		for (registro of detalle) {
			await ventasRepository.AgregarDetalle(registro);
		}
		// Eliminar el carrito y disminuir el stock
		for (n of carritos) {
			carritoID = n.id;
			productoID = n.producto_id;
			cantComprada = parseInt(n.cantidad);
			await carritoRepository.EliminarRegistro(carritoID);
			await productoRepository.DisminuirStock(productoID, cantComprada);
		}
		res.redirect("/carrito");
	},
};
