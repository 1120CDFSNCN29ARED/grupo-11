const fs = require('fs');
let path = require('path')
const productsFilePath = path.join(__dirname, '../database/productos.json');

const toThousand = (n) => {return n.toLocaleString("es-AR", {maximumFractionDigits: 0})}

const controller = {
	detalle: (req, res) => {
		const products = GetFileObject(productsFilePath);
		let producto = products.find(producto => producto.id == req.params.id);
		
		res.render('producto-detalle', { producto, toThousand });
	},
	eliminar: (req, res) => {
		const products = GetFileObject(productsFilePath);
		let indice = products.findIndex(producto => producto.id == req.params.id)
		
		//*** Eliminar ***//
		products.splice(indice,1)
		fs.writeFileSync(productsFilePath, JSON.stringify(products), { encoding: "utf-8" });
		
		res.redirect("/");
	},
	crear: (req, res) => {
		res.render('crear-producto');
	},	
	editar: (req, res) => {
		const products = GetFileObject(productsFilePath);
		let producto = products.find(producto => producto.id == req.params.id);
		
		res.render('producto-editar', { producto, toThousand });
	}
};

function GetFileObject(filePath) {
	return JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
}

module.exports = controller;