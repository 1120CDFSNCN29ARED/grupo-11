const db = require("../database/models");
const encabezado = db.encabezadoVenta;
const detalle = db.encabezadoVenta;

module.exports = {
	ObtenerEncabezadosTodos: () => {
		return encabezado.findAll();
	},

	ObtenerUltimaFC: () => {
		return encabezado
			.findAll({ order: [["numero_factura", "DESC"]] })
			.then((n) => n[0].numero_factura);
	},

	ImporteCarrito: () => {
		
	}
};