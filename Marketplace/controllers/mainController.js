let path = require('path');
const fs = require('fs');
const toThousand = (n) => {return n.toLocaleString("es-AR", {maximumFractionDigits: 0})}

const controller = {
	carrito: (req, res) => {
		res.render('carrito');
	},
	index: (req, res) => {
		const productos = GetFileData('productos.json');

		let seccionesProductos = [
			{
				titulo: "Mas vendidos",
				productos: productos.filter(x => x.masVendido)
			},
			{
				titulo: "Novedades",
				productos: productos.filter(x => x.novedades)
			}
		];
		
		res.render('index', {
			seccionesProductos,
			toThousand,
		});
	},
	login: (req, res) => {
		res.render('login');
	},
	registro: (req, res) => {
		res.render('registro');
	},
};

function GetFileData(fileName) {
	const fileRoute = path.resolve(__dirname, '../database/' + fileName)
	const data = fs.readFileSync(fileRoute, { encoding: "utf-8" });
	return JSON.parse(data);
}

module.exports = controller;