const db = require("../database/models");
const encabezado = db.encabezadoVenta;
const detalle = db.detalleVenta;

module.exports = {
	AgregarCabecera: async (usuarioID, importe) => {
		if (await encabezado.findAll().then(n => (n.length == 0))) {
			var numeroFC = 1
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

	AgregarDetalle: (registro) => {
		return detalle.create({
			...registro
		});
	},
};
