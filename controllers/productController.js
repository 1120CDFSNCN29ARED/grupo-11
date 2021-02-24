let path = require('path')

const controller = {
	detalle: (req, res) => {
		// this method receives the product id
		res.render('detalle-producto');
	},
};

module.exports = controller;