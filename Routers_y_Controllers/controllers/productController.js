const fs = require('fs');
let path = require('path')
//const jsonTable = require('../database/jsonTable');

const productsFilePath = path.join(__dirname, '../../database/productos.json');

const toThousand = (n) => {return n.toLocaleString("es-AR", {maximumFractionDigits: 0})}

const controller = {
	detalle: (req, res) => {
		let ID = req.params.id;
		var productos = require('../../database/productos')
		let producto = productos.find((n) => {
			return n.id == ID;
		})
		res.render('producto-detalle', {
			producto,
			toThousand,
		});
	},
	
	eliminar: (req, res) => {
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		let ID = req.params.id;
		let indice = products.findIndex(n => {return n.id == ID})
		//*** Eliminar ***
		products.splice(indice,1)
		fs.writeFileSync(productsFilePath, JSON.stringify(products));
		//****************
		res.redirect("/");

	},

	editar_form: (req,res) => {
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		let ID = req.params.id;
		let producto = products.find((n) => {
			return n.id == ID;
		})
		res.render('producto-editar', {producto, ID, toThousand});
	},

	editar_update: (req, res) => {
		console.log(req.body)
		const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		ID = req.params.id;
		let producto = productos.find((n) => {
			return n.id == ID
		});
		let indice = productos.indexOf(producto)
		const actualizado = {
			...producto,
			...req.body,
			//precio: Number(req.body.precio),
		};
		productos[indice] = actualizado
		res.send(ID + "" + req.body)
		fs.writeFileSync(productsFilePath, JSON.stringify(productos));
		res.redirect("/producto/" + ID + "/detalle");
	},

};

module.exports = controller;