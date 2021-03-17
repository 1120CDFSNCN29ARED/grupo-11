const fs = require('fs');
let path = require('path')
const productsFilePath = path.join(__dirname, '../database/productos.json');

const toThousand = (n) => {return n.toLocaleString("es-AR", {maximumFractionDigits: 0})}

const controller = {
	crearForm: (req, res) => {
		res.render('producto-crear');
	},
	crearGuardar:(req, res) =>{
		const productos = GetFileObject(productsFilePath);
		const nuevoId = productos.length > 0 ? productos[productos.length - 1].id + 1 : 1;
		const newProduct = {
			id: nuevoId,
			...req.body,
			imagen: req.file.filename,
            masVendido: false,
			novedades: false,
		};
		productos.push(newProduct);
		WriteFile(productsFilePath, productos);
		res.redirect('/');
	},
	detalle: (req, res) => {
		const products = GetFileObject(productsFilePath);
		let producto = products.find(producto => producto.id == req.params.id);
		
		res.render('producto-detalle', { producto, toThousand });
	},
	editarForm: (req, res) => {
		const products = GetFileObject(productsFilePath);
		let producto = products.find(producto => producto.id == req.params.id);
		
		res.render('producto-editar', { producto, toThousand });
	},
	editarGuardar: (req, res) => {
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
		WriteFile(productsFilePath, productos);
		res.redirect("/producto/" + productId);
	},	
	eliminar: (req, res) => {
		const productos = GetFileObject(productsFilePath);
		let indice = productos.findIndex(producto => producto.id == req.params.id)
		
		//*** Eliminar ***//
		productos.splice(indice,1)
		WriteFile(productsFilePath, productos);
		
		res.redirect("/");
	},
};

function GetFileObject(filePath) {
	return JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
}

function SanitizePrice(priceString) {
	return priceString.replace(".", "").replace(",", ".").replace("$", "").replace(" ", "");
}

function WriteFile(filePath, content) {
	fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
}

module.exports = controller;