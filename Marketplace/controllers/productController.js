let path = require('path')
const toThousand = (n) => {return n.toLocaleString("es-AR", {maximumFractionDigits: 0})}

const controller = {
	detalle: (req, res) => {
		var masVendidos = require('../database/masVendidos')
		var novedades = require('../database/novedades')
		const productos = masVendidos.concat(novedades);

		let ID = req.params.id;
		let producto = productos.find((n) => {
			return n.vinculo == ID;
		})
		res.render('detalle-producto', {
			producto,
			toThousand,
		});
	},
	crearProducto: (req, res) => {
		res.render('crear-producto');
	},	
	editarProducto: (req, res) => {
		res.render('editar-producto');
	}
};

module.exports = controller;