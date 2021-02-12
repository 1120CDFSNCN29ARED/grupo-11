let path = require('path')

const controlador = {
	detalle: (req, res) => {
		// this method should check the received id
		res.sendFile(path.resolve(__dirname, '../views/product/detalle-producto.html'))
	},
};

module.exports = controlador;