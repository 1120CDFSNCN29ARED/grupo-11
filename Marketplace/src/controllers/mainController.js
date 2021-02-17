let path = require('path')

const controller = {
	carrito: (req, res) => {
		res.sendFile(path.resolve(__dirname, '../views/carrito.html'))
	},
	index: (req, res) => {
		res.sendFile(path.resolve(__dirname, '../views/index.html'))
	},
	login: (req, res) => {
		res.sendFile(path.resolve(__dirname, '../views/user/login.html'))
	},
	registro: (req, res) => {
		res.sendFile(path.resolve(__dirname, '../views/user/registro.html'))
	},
};

module.exports = controller;