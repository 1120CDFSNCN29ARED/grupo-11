const fs = require('fs');
let path = require('path');

const productoFilePath = path.join(__dirname, '../database/pruebacrearproducto.json');

const controller = {
	detalle: (req, res) => {
		// this method receives the product id
		res.render('detalle-producto');
	},

	crearProducto: (req, res) => {
		res.render('crear-producto');
	},

	guardarProducto:(req, res) =>{
		const producto = JSON.parse(fs.readFileSync(productoFilePath, "utf-8"));
		nuevoId = producto.length > 0 ? producto[producto.length - 1].id + 1 : 1;

		const newProduct = {
			id: nuevoId,
		    ...req.body,
		 };
	  
		  producto.push(newProduct);
	  
		  fs.writeFileSync(productoFilePath, JSON.stringify(producto));
	  
		  res.redirect('/');
		},
	
	editarProducto: (req, res) => {
		res.render('editar-producto');
	},
	
};

module.exports = controller;