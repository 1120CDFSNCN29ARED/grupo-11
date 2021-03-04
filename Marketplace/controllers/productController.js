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
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
		
		res.redirect("/");
	},
	crear: (req, res) => {
		res.render('crear-producto');
	},
	editar: (req, res) => {
		const products = GetFileObject(productsFilePath);
		let producto = products.find(producto => producto.id == req.params.id);
		
		res.render('producto-editar', { producto, toThousand });
	},
	update: (req, res) => {
		const productos = GetFileObject(productsFilePath);
		const productId = req.params.id;
		let producto = productos.find(producto => producto.id == productId);
		let indice = productos.indexOf(producto)
		let price = SanitizePrice(req.body.precio);
		const actualizado = {
			...producto,
			...req.body,
			precio: Number(price),
		};
		productos[indice] = actualizado
		fs.writeFileSync(productsFilePath, JSON.stringify(productos, null, 2));
		res.redirect("/producto/" + productId);
	},	
	guardarProducto:(req, res) =>{
		const productos = GetFileObject(productsFilePath);
		const nuevoId = productos.length > 0 ? productos[productos.length - 1].id + 1 : 1;

		const newProduct = {
			id: nuevoId,
			...req.body,
		};

		producto.push(newProduct);
		fs.writeFileSync(productoFilePath, JSON.stringify(producto, null, 2));
		res.redirect('/');
	}
};

function GetFileObject(filePath) {
	return JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
}

function SanitizePrice(priceString) {
	return priceString.replace(".", "").replace(",", ".").replace("$", "").replace(" ", "");
}

module.exports = controller;