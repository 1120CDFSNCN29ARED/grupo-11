let path = require('path')

const controller = {
	detalle: (req, res) => {
		// this method receives the product id
		res.sendFile(path.resolve(__dirname, '../views/product/detalle-producto.html'))
	},
};

module.exports = controller;