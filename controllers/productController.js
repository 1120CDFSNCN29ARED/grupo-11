let path = require('path')
const toThousand = (n) => {return n.toLocaleString("es-AR", {maximumFractionDigits: 0})}

const controller = {
	detalle: (req, res) => {
		let ID = req.params.id;
		var productos = require('../database/productos')
		let producto = productos.find((n) => {
			return n.vinculo == ID;
		})
		res.render('detalle-producto', {
			producto,
			toThousand,
		});
	},
};

module.exports = controller;