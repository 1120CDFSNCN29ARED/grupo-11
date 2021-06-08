// Requires ***********************************
const productoRepository = require("../repositories/productoRepository");
const carritoRepository = require("../repositories/carritoRepository");
const ventasRepository = require("../repositories/ventasRepository");

module.exports = {
	kickOff: async (req, res) => {
		// Comparar la compra vs el stock y si lo supera --> corregirlo y devolver al carrito
		let usuarioID = req.session.usuarioLogeado.id;
		let carritos = await carritoRepository.ObtenerTodos(usuarioID);
		let api = await productoRepository.ObtenerTodos();
		var cambio = false;
		for (carrito of carritos) {
			if (carrito.cantidad == 0) {
				await carritoRepository.EliminarCarrito(carrito.id);
				cambio = true;
			} else {
				productoID = carrito.producto_id;
				stockDisponible = api.find((m) => m.id == productoID).stock_disponible;
				if (carrito.cantidad > stockDisponible) {
					await carritoRepository.ActualizarCarrito(carrito.id, stockDisponible);
					cambio = true;
				}
			}
		}
		cambio ? res.redirect("/carrito") : "";
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
		// Eliminar los carritos y disminuir el stock según la compra
		for (n of carritos) {
			// Eliminar los carritos
			carritoID = n.id;
			await carritoRepository.EliminarCarrito(carritoID);
			// Disminuir el stock
			productoID = n.producto_id;
			let stock_disponible = await productoRepository
				.ObtenerPorId(productoID)
				.then((n) => n.stock_disponible);
			cantComprada = parseInt(n.cantidad);
			let nuevoStock = stock_disponible - cantComprada;
			await productoRepository.ActualizarStock(productoID, nuevoStock);
		}
		res.redirect("/carrito");
	},
};
