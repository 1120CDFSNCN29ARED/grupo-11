let path = require('path')

const controlador = {
	main: (req,res) => {res.sendFile(path.resolve(__dirname, '../views/' + req.params.id + '.html'))},
	home: (req,res) => {res.sendFile(path.resolve(__dirname, '../views/index.html'))},
};

module.exports = controlador;
