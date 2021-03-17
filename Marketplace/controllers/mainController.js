let path = require('path');
const fs = require('fs');
const toThousand = (n) => {return n.toLocaleString("es-AR", {maximumFractionDigits: 0})}

const controller = {

	carrito: (req, res) => {
		let titulo = "Carrito de Compras"
		res.render('carrito', {titulo});
	},

	index: (req, res) => {
		const productos = GetFileData('productos.json');
		let titulo = "Guitar Shop"
		let seccionesProductos = [
			{titulo: "Mas vendidos",productos: productos.filter(x => x.masVendido)},
			{titulo: "Novedades",productos: productos.filter(x => x.novedades)}
		];
		
		let categoriaProductos = GetFileData('categoriasDeProductos.json');
		res.render('index', {
			seccionesProductos,
			toThousand,
			categoriaProductos,
			titulo,
		});
	},

	login: (req, res) => {
		let titulo = "Login"
		res.render('login', {titulo});
	},
};

function GetFileData(fileName) {
	const fileRoute = path.resolve(__dirname, '../database/' + fileName)
	const data = fs.readFileSync(fileRoute, { encoding: "utf-8" });
	return JSON.parse(data);
}

module.exports = controller;