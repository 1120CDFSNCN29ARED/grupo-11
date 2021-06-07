const db = require("../database/models");
const encabezado = db.encabezadoVenta;
const detalle = db.detalleVenta;

module.exports = {
	ObtenerTodos: () => {
		return encabezado.findAll({
			include: ["usuario", "detalleVenta"],
		});
	},

	ObtenerDetallePorUsuario: (usuarioID) => {
		return encabezado.findAll({
			include: ["usuario", "detalleVenta"],
			where: { usuario_id: usuarioID },
		});
	},

	ObtenerImportePorUsuario: async (usuarioID) => {
		let detalleVenta = await encabezado.findAll({
			where: { usuario_id: usuarioID },
		});
		let acumulador = 0;
		for (n of detalleVenta) {
			acumulador = acumulador + n.importe;
		}
		return acumulador;
	},

	ObtenerDetallePorProducto: (productoID) => {
		return detalle.findAll({
			include: ["producto", "venta_encabezado"],
			where: { producto_id: productoID },
		});
	},

	ObtenerImportePorProducto: async (productoID) => {
		let detalleVenta = await detalle.findAll({
			where: { producto_id: productoID },
		});
		let acumulador = 0;
		for (n of detalleVenta) {
			acumulador = acumulador + n.cantidad * n.precio;
		}
		return acumulador;
	},

	AgregarCabecera: async (usuarioID, importe) => {
		if (await encabezado.findAll().then((n) => n.length == 0)) {
			var numeroFC = 1;
		} else {
			var numeroFC = await encabezado
				.findAll({ order: [["numero_factura", "DESC"]] })
				.then((n) => n[0].numero_factura + 1);
		}
		await encabezado.create({
			usuario_id: usuarioID,
			numero_factura: numeroFC,
			fecha_emision: new Date(),
			importe: importe,
		});
		return encabezado
			.findOne({
				where: { numero_factura: numeroFC },
			})
			.then((n) => n.id);
	},

	AgregarDetalle: (carrito) => {
		return detalle.create({
			...carrito,
		});
	},
};
