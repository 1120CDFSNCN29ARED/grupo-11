// Requires ***********************************
const ventasRepository = require("../../repositories/ventasRepository");
const productoRepository = require("../../repositories/productoRepository");
const usuarioRepository = require("../../repositories/usuarioRepository");

module.exports = {
	ventasPorCliente: async (req, res) => {
		// Obtener los datos
		let usuarioID = req.session.usuarioLogeado.id;
		let ventasDetalle = await ventasRepository.ObtenerDetallePorUsuario(usuarioID);
		let ventasImporte = await ventasRepository.ObtenerImportePorUsuario(usuarioID);
		let productos = await productoRepository.ObtenerTodos();
		//return res.send(ventasDetalle)
		// Armar la respuesta de detalle_de_venta
		let detalle_de_venta = [];
		ventasDetalle.map((n) => {
			detalle_de_venta.push({
				numero_factura: n.numero_factura,
				importe: n.importe,
				fechaEmision: n.fecha_emision,
				usuarioNombre: n.usuario.nombre + " " + n.usuario.apellido,
				detalleVenta: n.detalleVenta.map((m) => {
					aux = {
						producto_id: m.producto_id,
						producto: productos.find((o) => o.id == m.producto_id).nombre,
						cantidad: m.cantidad,
						precio: m.precio,
					};
					return aux;
				}),
			});
		});
		// Armar la respuesta final
		let ventas = {
			FC_total: ventasImporte,
			detalle_de_venta: detalle_de_venta,
		};
		// Mostrar la respuesta
		res.json(ventas);
	},

	ventasPorProducto: async (req, res) => {
		// Obtener los datos
		let productoID = req.params.id;
		let ventasDetalle = await ventasRepository.ObtenerDetallePorProducto(productoID);
		let ventasTotal = await ventasRepository.ObtenerImportePorProducto(productoID);
		let productoBD = await productoRepository.ObtenerPorId(productoID);
		//return res.send(productoBD)
		let usuarios = await usuarioRepository.ObtenerTodos();
		// Armar la respuesta de datos_del_producto
		let producto = {
			id: productoBD.id,
			nombre: productoBD.nombre,
			descripcion: productoBD.descripcion,
			categoria_id: productoBD.categoria.nombre,
			marca_id: productoBD.marca.nombre,
			modelo_id: productoBD.modelo.nombre,
			precio: productoBD.precio,
			stock_disponible: productoBD.stock_disponible,
			mas_vendido: productoBD.mas_vendido,
			novedades: productoBD.novedades,
			creado_por:
				productoBD.creadoPor.nombre +
				" " +
				productoBD.creadoPor.apellido,
			creado_en: "2021-04-21",
			borrado: false,
		};
		// Armar la respuesta de detalle_de_venta
		let detalle_de_venta = ventasDetalle.map((m) => {
			aux = {
				numeroFC: m.venta_encabezado.numero_factura,
				fecha: m.venta_encabezado.fecha_emision,
				usuario:
					usuarios.find((o) => o.id == m.venta_encabezado.usuario_id)
						.nombre +
					" " +
					usuarios.find((o) => o.id == m.venta_encabezado.usuario_id)
						.apellido,
				cantidad: m.cantidad,
				precio: m.precio,
				importe: m.cantidad * m.precio,
			};
			return aux;
		});
		// Armar la respuesta final
		let ventas = {
			datos_del_producto: producto,
			FC_total: ventasTotal,
			detalle_de_venta: detalle_de_venta,
		};
		// Mostrar la respuesta
		res.json(ventas);
	},
};
