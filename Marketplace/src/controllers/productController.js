let path = require('path')

const controller = {
	detalle: (req, res) => {
		// this method receives the product id
		res.render('detalle-producto');
	},
	crearProducto: (req, res) => {
		res.render('crear-producto');
	},	
	editarProducto: (req, res) => {
		res.render('editar-producto');
	}
};

module.exports = controller;