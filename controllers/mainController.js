let path = require('path');
const fs = require('fs');
const toThousand = (n) => {return n.toLocaleString("es-AR", {maximumFractionDigits: 0})}

const controller = {
	carrito: (req, res) => {
		res.render('carrito');
	},
	index: (req, res) => {
		const masVendidos = GetFileData('masVendidos.json');
		const novedades = GetFileData('novedades.json');
		res.render('index', {
			masVendidos,
			novedades,
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