let path = require('path');
const fs = require('fs');
const toThousand = (n) => {return n.toLocaleString("es-AR", {maximumFractionDigits: 0})}

const controller = {

	carrito: (req, res) => {
		res.render('carrito', {
			titulo: "Carrito de Compras"
		});
	},

	index: (req, res) => {
		const productos = GetFileData('productos.json');
		let seccionesProductos = [
			{titulo: "Mas vendidos",productos: productos.filter(x => x.masVendido)},
			{titulo: "Novedades",productos: productos.filter(x => x.novedades)}
		];
		let categoriaProductos = GetFileData('categoriasDeProductos.json');
		res.render('index', {
			seccionesProductos,
			toThousand,
			categoriaProductos,
			titulo: "Guitar Shop"
		});
	},

	login: (req, res) => {
		res.render('login', {
			titulo: "Login"
		});
	},
};

function GetFileData(fileName) {
	const fileRoute = path.resolve(__dirname, '../database/' + fileName)
	const data = fs.readFileSync(fileRoute, { encoding: "utf-8" });
	return JSON.parse(data);
}

module.exports = controller;