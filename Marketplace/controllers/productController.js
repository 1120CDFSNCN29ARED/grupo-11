let path = require('path')
const toThousand = (n) => {return n.toLocaleString("es-AR", {maximumFractionDigits: 0})}

const controller = {
	detalle: (req, res) => {
		var productos = require('../database/productos')
		let producto = productos.find((producto) => producto.id == req.params.id)
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