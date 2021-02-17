let path = require('path');
const fs = require('fs');

const controller = {
	carrito: (req, res) => {
		res.sendFile(path.resolve(__dirname, '../views/carrito.html'));
	},
	index: (req, res) => {
		const masVendidos = GetFileData('masVendidos.json');
		const novedades = GetFileData('novedades.json');
		res.sendFile(path.resolve(__dirname, '../views/index.html'),
					{
						'masVendidos':masVendidos, 
						'novedades':novedades
					});
	},
	login: (req, res) => {
		res.sendFile(path.resolve(__dirname, '../views/user/login.html'));
	},
	registro: (req, res) => {
		res.sendFile(path.resolve(__dirname, '../views/user/registro.html'));
	},
};

function GetFileData(fileName) {
	const fileRoute = path.resolve(__dirname, '../database/' + fileName)
	const data = fs.readFileSync(fileRoute, { encoding: "utf-8" });
	return JSON.parse(data);
}

module.exports = controller;