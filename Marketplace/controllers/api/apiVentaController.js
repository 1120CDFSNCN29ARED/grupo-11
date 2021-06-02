// Requires ***********************************
const ventasRepository = require("../../repositories/ventasRepository");
const productoRepository = require("../../repositories/productoRepository");

module.exports = {
	ventaPorCliente: async (req, res) => {
		let usuarioID = req.session.usuarioLogeado.id;
		let dataVentas = await ventasRepository.ObtenerPorUsuario(usuarioID);
		let dataProductos = await productoRepository.ObtenerTodos();
		//return res.send(dataProductos)
		let ventas = [];
		dataVentas.map((n) => {
			ventas.push({
				facturaID: n.id,
				numero_factura: n.numero_factura,
				importe: n.importe,
				fechaEmision: n.fecha_emision,
				usuarioNombre: n.usuario.nombre + " " + n.usuario.apellido,
				detalleVenta: n.detalleVenta.map((m) => {
					aux = {
						producto_id: m.producto_id,
						producto: dataProductos.find(
							(o) => o.id == m.producto_id
						).nombre,
						cantidad: m.cantidad,
						precio: m.precio,
					};
					return aux;
				}),
			});
		});
		res.json(ventas);
	},

	ventaPorProducto: async (req, res) => {
		let dataVentas = await ventasRepository.ObtenerPorProducto(productoID);
		let dataProductos = await productoRepository.ObtenerPorId(productoID);
		//return res.send(dataProductos)
		let ventas = [];
		dataVentas.map((n) => {
			ventas.push({
				









				facturaID: n.id,
				numero_factura: n.numero_factura,
				importe: n.importe,
				fechaEmision: n.fecha_emision,
				usuarioNombre: n.usuario.nombre + " " + n.usuario.apellido,
				detalleVenta: n.detalleVenta.map((m) => {
					aux = {
						producto_id: m.producto_id,
						producto: dataProductos.find(
							(o) => o.id == m.producto_id
						).nombre,
						cantidad: m.cantidad,
						precio: m.precio,
					};
					return aux;
				}),
			});
		});
		res.json(ventas);
	},
};
